import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PDFDocument } from 'pdf-lib'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const supabase = await createClient()

    // Find signer
    const { data: signer, error: signerError } = await supabase
      .from('signers')
      .select('id, document_id, status, email, name')
      .eq('access_token', token)
      .single()

    if (signerError || !signer) {
      return NextResponse.json(
        { error: 'Ogiltig eller utgången länk' },
        { status: 404 }
      )
    }

    if (signer.status === 'signed') {
      return NextResponse.json(
        { error: 'Du har redan signerat detta dokument' },
        { status: 400 }
      )
    }

    const { fieldValues } = await request.json()

    if (!fieldValues || Object.keys(fieldValues).length === 0) {
      return NextResponse.json(
        { error: 'Inga signaturer att spara' },
        { status: 400 }
      )
    }

    // Get signature fields
    const { data: fields } = await supabase
      .from('signature_fields')
      .select('*')
      .eq('document_id', signer.document_id)
      .eq('signer_id', signer.id)

    if (!fields || fields.length === 0) {
      return NextResponse.json(
        { error: 'Inga signaturfält hittades' },
        { status: 400 }
      )
    }

    // Update field values
    for (const field of fields) {
      const value = fieldValues[field.id]
      if (value) {
        await supabase
          .from('signature_fields')
          .update({ value })
          .eq('id', field.id)
      }
    }

    // Update signer status
    await supabase
      .from('signers')
      .update({
        status: 'signed',
        signed_at: new Date().toISOString()
      })
      .eq('id', signer.id)

    // Create audit log
    await supabase.from('audit_logs').insert({
      document_id: signer.document_id,
      signer_id: signer.id,
      action: 'document_signed',
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      user_agent: request.headers.get('user-agent'),
      metadata: {
        fields_signed: Object.keys(fieldValues).length
      }
    })

    // Check if all signers have signed
    const { data: allSigners } = await supabase
      .from('signers')
      .select('id, status')
      .eq('document_id', signer.document_id)

    const allSigned = allSigners?.every(s => s.status === 'signed')

    if (allSigned) {
      // Update document status to completed
      await supabase
        .from('documents')
        .update({ status: 'completed' })
        .eq('id', signer.document_id)

      await supabase.from('audit_logs').insert({
        document_id: signer.document_id,
        action: 'document_completed',
        metadata: { total_signers: allSigners?.length }
      })

      // TODO: Merge signatures into PDF and send to all parties
      // This would be done in a background job in production
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submit signature error:', error)
    return NextResponse.json(
      { error: 'Kunde inte spara signaturen' },
      { status: 500 }
    )
  }
}
