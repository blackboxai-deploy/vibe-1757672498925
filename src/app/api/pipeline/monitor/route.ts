import { NextRequest, NextResponse } from 'next/server';

interface PipelineStats {
  active_pipelines: number;
  completed_today: number;
  success_rate: string;
  avg_execution_time: string;
  cost_per_pipeline: string;
}

interface Pipeline {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed' | 'queued';
  progress: number;
  started_at: string;
  estimated_completion?: string;
  worker_count: number;
  region: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '24h';

    // Generate realistic pipeline data
    const stats: PipelineStats = {
      active_pipelines: Math.floor(Math.random() * 8) + 3,
      completed_today: Math.floor(Math.random() * 25) + 15,
      success_rate: '98.7%',
      avg_execution_time: '2.4m',
      cost_per_pipeline: '$0.12'
    };

    const pipelines: Pipeline[] = [
      {
        id: 'pipeline-001',
        name: 'Voice Command Processing',
        status: 'running',
        progress: 75,
        started_at: new Date(Date.now() - 300000).toISOString(),
        estimated_completion: new Date(Date.now() + 120000).toISOString(),
        worker_count: 3,
        region: 'us-east-1'
      },
      {
        id: 'pipeline-002',
        name: 'BlackBox AI Integration',
        status: 'completed',
        progress: 100,
        started_at: new Date(Date.now() - 600000).toISOString(),
        worker_count: 2,
        region: 'us-west-1'
      },
      {
        id: 'pipeline-003',
        name: 'Cloud Worker Deployment',
        status: 'running',
        progress: 45,
        started_at: new Date(Date.now() - 180000).toISOString(),
        estimated_completion: new Date(Date.now() + 300000).toISOString(),
        worker_count: 5,
        region: 'eu-central-1'
      }
    ];

    // Log to N8N webhook
    try {
      await fetch(process.env.CLOUD_HOOK!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'pipeline_monitor_request',
          timeframe,
          stats,
          active_pipelines: pipelines.filter(p => p.status === 'running').length,
          timestamp: new Date().toISOString(),
          user: 'louiewong4@gmail.com'
        })
      });
    } catch (webhookError) {
      console.warn('Pipeline webhook failed:', webhookError);
    }

    return NextResponse.json({
      success: true,
      stats,
      pipelines,
      scaling_info: {
        auto_scaling_enabled: true,
        scale_trigger_threshold: 80,
        max_workers_per_region: 10,
        current_utilization: '67%'
      },
      generated_at: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get pipeline status' },
      { status: 500 }
    );
  }
}