import json
from kafka import KafkaProducer
from app.core.config import settings


producer = KafkaProducer(
    bootstrap_servers=[b.strip() for b in settings.kafka_brokers.split(',')],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
)


def emit_event(topic: str, event: dict) -> None:
    producer.send(topic, event)
    producer.flush()
