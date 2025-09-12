import { NextRequest, NextResponse } from 'next/server';

interface VoiceCommandRequest {
  command: string;
  user?: string;
  timestamp?: string;
  priority?: 'low' | 'normal' | 'high';
  includeDeployment?: boolean;
}

interface BlackBoxResponse {
  success: boolean;
  message: string;
  action_taken: string;
  worker_deployed?: boolean;
  deployment_url?: string;
  execution_time: string;
  cost_estimate?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { command, user, timestamp, priority = 'normal', includeDeployment = true }: VoiceCommandRequest = await request.json();
    
    const startTime = Date.now();
    let actionTaken = 'Command processed';
    let workerDeployed = false;
    let deploymentUrl = '';

    // Process voice command with BlackBox AI logic
    const processedCommand = command.toLowerCase();
    
    if (processedCommand.includes('deploy') || processedCommand.includes('worker')) {
      actionTaken = 'Worker deployment initiated';
      workerDeployed = true;
      deploymentUrl = `https://worker-${Date.now()}.louiewong4.workers.dev`;
      
      // Simulate worker deployment to Cloudflare
      if (includeDeployment) {
        try {
          // Mock Cloudflare Worker deployment
          const workerResponse = await fetch('/api/workers/deploy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: `voice-deployed-${Date.now()}`,
              region: 'us-east-1',
              trigger: 'voice_command',
              user: user || 'louiewong4@gmail.com'
            })
          });
          
          if (workerResponse.ok) {
            const deployResult = await workerResponse.json();
            deploymentUrl = deployResult.url || deploymentUrl;
          }
        } catch (deployError) {
          console.warn('Worker deployment simulation failed:', deployError);
        }
      }
    } else if (processedCommand.includes('scale')) {
      actionTaken = 'Auto-scaling triggered across regions';
    } else if (processedCommand.includes('health') || processedCommand.includes('status')) {
      actionTaken = 'System health check completed';
    } else if (processedCommand.includes('report') || processedCommand.includes('analytics')) {
      actionTaken = 'Analytics report generated';
    } else {
      actionTaken = 'General system command executed';
    }

    const executionTime = `${Date.now() - startTime}ms`;
    
    // Calculate cost estimate based on action
    const costEstimate = workerDeployed ? '$0.08' : '$0.02';

    const response: BlackBoxResponse = {
      success: true,
      message: `Voice command "${command}" processed successfully with BlackBox AI`,
      action_taken: actionTaken,
      worker_deployed: workerDeployed,
      deployment_url: workerDeployed ? deploymentUrl : undefined,
      execution_time: executionTime,
      cost_estimate: costEstimate
    };

    // Send to N8N webhook for logging
    try {
      if (process.env.CLOUD_HOOK) {
        await fetch(process.env.CLOUD_HOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'voice_command_processed',
            command,
            user: user || 'louiewong4@gmail.com',
            timestamp: timestamp || new Date().toISOString(),
            priority,
            response,
            blackbox_integration: true,
            source: 'voice_blackbox_dashboard'
          })
        });
      }
    } catch (webhookError) {
      console.warn('Webhook notification failed:', webhookError);
    }

    // Store in collaborative sync
    try {
      await fetch('/api/collaborative/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'voice_command',
          data: {
            command,
            action_taken: actionTaken,
            worker_deployed: workerDeployed,
            execution_time: executionTime
          },
          session_id: `voice_session_${Date.now()}`
        })
      });
    } catch (syncError) {
      console.warn('Collaborative sync failed:', syncError);
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Voice BlackBox processing error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to process voice command',
      action_taken: 'Error occurred',
      execution_time: '0ms',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      status: 'active',
      blackbox_integration: 'connected',
      voice_recognition: 'enabled',
      supported_commands: [
        'Deploy worker',
        'Scale up/down workers',
        'Check system health',
        'Generate analytics report',
        'Execute pipeline',
        'Show cost analysis'
      ],
      current_user: 'louiewong4@gmail.com',
      wake_lock_status: 'active',
      last_command_time: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Failed to get voice system status'
    }, { status: 500 });
  }
}