/**
 * LEAD FORM API ROUTE
 * 
 * Purpose:
 * Handles submissions from the embedded online booking form.
 * Validates incoming data and creates new lead records in the system.
 * 
 * Endpoint: POST /api/leadform
 * 
 * Expected Payload:
 * {
 *   org_id: string (required) - Organization identifier
 *   name: string (required) - Lead name
 *   email?: string - Lead email
 *   phone?: string - Lead phone number
 *   service?: string - Requested service
 *   message?: string - Additional details
 * }
 * 
 * Response:
 * Success (200): { success: true, leadId: string }
 * Error (400/500): { success: false, error: string }
 */

import { NextRequest, NextResponse } from 'next/server'

/**
 * LEAD FORM SUBMISSION INTERFACE
 * 
 * Defines the structure of incoming form data.
 */
interface LeadFormData {
  org_id: string
  name: string
  email?: string
  phone?: string
  service?: string
  message?: string
}

/**
 * POST Handler
 * 
 * Processes lead form submissions from embedded booking forms.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const data: LeadFormData = await request.json()

    // Validate required fields
    if (!data.org_id) {
      return NextResponse.json(
        { success: false, error: 'Organization ID is required' },
        { status: 400 }
      )
    }

    if (!data.name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      )
    }

    // Validate at least one contact method
    if (!data.email && !data.phone) {
      return NextResponse.json(
        { success: false, error: 'Email or phone number is required' },
        { status: 400 }
      )
    }

    // Generate unique lead ID
    const leadId = `L-${Date.now()}`

    // Mock lead creation (In production: Save to database)
    const newLead = {
      id: leadId,
      org_id: data.org_id,
      name: data.name,
      email: data.email || '',
      phone: data.phone || '',
      service: data.service || '',
      message: data.message || '',
      status: 'New',
      source: 'Online Booking Form',
      created: new Date().toISOString(),
    }

    // Log the lead (In production: Replace with database insert)
    console.log('New lead received:', newLead)

    // In production: Save to database
    // await db.leads.create(newLead)

    // In production: Send notification email
    // await sendEmail({
    //   to: 'admin@company.com',
    //   subject: 'New Lead from Booking Form',
    //   body: `New lead: ${data.name} - ${data.email || data.phone}`
    // })

    // Return success response
    return NextResponse.json(
      {
        success: true,
        leadId: leadId,
        message: 'Lead submitted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Lead form submission error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS Handler
 * 
 * Handles CORS preflight requests for cross-origin form submissions.
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}

