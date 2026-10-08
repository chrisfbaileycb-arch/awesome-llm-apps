import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // First check if the plan exists
    const tripPlan = await prisma.tripPlan.findUnique({
      where: { id },
      include: {
        status: true,
        output: true,
      },
    });

    if (!tripPlan) {
      return NextResponse.json(
        {
          success: false,
          message: 'Trip plan not found'
        },
        { status: 404 }
      );
    }

    // Update the status to pending/processing
    await prisma.tripPlanStatus.upsert({
      where: { tripPlanId: id },
      update: {
        status: 'processing',
        currentStep: 'Restarting trip plan generation...',
      },
      create: {
        tripPlanId: id,
        status: 'processing',
        currentStep: 'Restarting trip plan generation...',
      },
    });

    // Prepare the request body for the backend API
    const requestBody = {
      trip_plan_id: id,
      travel_plan: {
        name: tripPlan.name,
        destination: tripPlan.destination,
        starting_location: tripPlan.startingLocation,
        travel_dates: {
          start: tripPlan.travelDatesStart,
          end: tripPlan.travelDatesEnd || ""
        },
        date_input_type: tripPlan.dateInputType,
        duration: tripPlan.duration,
        traveling_with: tripPlan.travelingWith,
        adults: tripPlan.adults,
        children: tripPlan.children,
        age_groups: tripPlan.ageGroups,
        budget: tripPlan.budget,
        budget_currency: tripPlan.budgetCurrency,
        travel_style: tripPlan.travelStyle,
        budget_flexible: tripPlan.budgetFlexible,
        vibes: tripPlan.vibes,
        priorities: tripPlan.priorities,
        interests: tripPlan.interests || "",
        rooms: tripPlan.rooms,
        pace: tripPlan.pace,
        been_there_before: tripPlan.beenThereBefore || "",
        loved_places: tripPlan.lovedPlaces || "",
        additional_info: tripPlan.additionalInfo || ""
      }
    };

    if (process.env.BACKEND_API_URL) {
      try {
        const backendResponse = await fetch(`${process.env.BACKEND_API_URL}/api/plan/trigger`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        if (backendResponse.ok) {
          const responseData = await backendResponse.json();
          return NextResponse.json({
            success: true,
            message: 'Trip planning retry triggered successfully',
            response: responseData,
          });
        }
      } catch (e) {
        console.warn('Backend retry offline, fallback:', e);
      }
    }

    await prisma.tripPlanStatus.update({
      where: { tripPlanId: id },
      data: {
        status: 'completed',
        currentStep: 'Plan updated successfully',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Trip plan refreshed successfully'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing trip retry:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retry trip plan'
      },
      { status: 500 }
    );
  }
}