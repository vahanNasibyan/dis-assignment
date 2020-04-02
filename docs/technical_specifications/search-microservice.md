##Technical Specification document 
Last modified: 29 March 2020 
Author: Vahan Nasibyan
Team: TBD 

##Summary  

Service which responsible for product search

##Goals 
- Build service which will allow to search products

## Plan 

Create public accesssible interface to search products.


## Tech stack 
- AWS as cloud provider. 
- Kubernetes 
- Docker 
- Gitlab CI.
- Github
- NATS
- Redis 
- OpenApi/Swagger
- ElasticSearch

## Open Questions 
    1. Geo Based search?
    2. Personalized search?

## Measures
    1. Average response time  ~175ms
    2. Req/sec. TBD
    3. Service Availability. ~99.9%
    4. Outsanding bug count. <2/month 
    6. Test coverage percentage >=90%
    7. Search -> add to basket -> checkout retention
    8. Number of Service Interruptions
    9. Duration of Service Interruptions: How long the service was unavailable


## Timeline and Milestones 

Jira and/or Roadmunk link

## Additional Info
P.S. We'll likely need to update your tech spec as project and product progresses.
