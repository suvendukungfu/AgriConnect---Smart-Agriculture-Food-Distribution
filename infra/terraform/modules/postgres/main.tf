resource "aws_db_subnet_group" "this" {
  name       = "${var.project_name}-db-subnet"
  subnet_ids = var.subnet_ids
}

resource "aws_db_instance" "this" {
  identifier          = "${var.project_name}-postgres"
  engine              = "postgres"
  engine_version      = "16"
  instance_class      = "db.t4g.medium"
  allocated_storage   = 100
  db_name             = "agriconnect"
  username            = "agriconnect"
  password            = "change-me"
  skip_final_snapshot = true
  db_subnet_group_name = aws_db_subnet_group.this.name
}
