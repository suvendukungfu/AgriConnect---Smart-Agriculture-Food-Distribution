# Production environment — high availability, multi-AZ
environment            = "prod"
aws_region             = "ap-south-1"
vpc_cidr               = "10.2.0.0/16"
availability_zones     = ["ap-south-1a", "ap-south-1b", "ap-south-1c"]
db_instance_class      = "db.r6g.large"
eks_node_instance_type = "t3.xlarge"
eks_desired_capacity   = 3
eks_min_size           = 2
eks_max_size           = 10
