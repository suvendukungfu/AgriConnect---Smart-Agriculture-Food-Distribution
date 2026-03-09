export interface OtelConfig {
  serviceName: string;
  endpoint?: string;
}

export function initOpenTelemetry(config: OtelConfig) {
  // Placeholder initializer for OpenTelemetry SDK integration.
  // In production wire @opentelemetry/sdk-node exporters and auto-instrumentations.
  return {
    serviceName: config.serviceName,
    endpoint: config.endpoint ?? 'http://otel-collector:4317',
  };
}
