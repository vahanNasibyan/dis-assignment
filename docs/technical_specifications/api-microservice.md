##Technical Specification document 
Last modified: 29 March 2020 
Author: Vahan Nasibyan
Team: TBD 

##Summary  

Current system for handling and  orchestration all incoming API requests for current namespace.


##Goals 
- Build scalable,reliable, secure, API gateway which can serve our customer needs over the time.
- Easy to extend and maintain
- Blazing fast responses  

## Plan 

We will use microservice architechture  based on node which is extendable  and able to communicate with microservies written in other language. For mor details see https://moleculer.services/ 
API gateway will API versioning, logging and tracing mechanisms. 
Architecture overview see here.


## Tech stack 
- AWS as cloud provider. 
- Kubernetes 
- Docker 
- Gitlab CI.
- Github
- NATS
- Redis 
- OpenApi/Swagger 

## Open Questions 
    1. Localization 
    2. Namespace definition
    3. GRPC vs NATS 


## Security and Privacy 

We will add API accessability restrictions, trottling and application authorization for all endpoints for v1.

## Measures
    1. Average response time  ~175ms
    2. Req/sec. TBD
    3. Uptime. ~99.9%
    4. Outsanding bug count. <2/month 
    5. Maintainance cost. TBD
    6. Test coverage percentage >=90%
    7. Development speed. TODO/DONE + New feature development time
    8. Number of Service Interruptions
    9. Duration of Service Interruptions: How long the service was unavailable

## Timeline and Milestones 

Jira and/or Roadmunk link

## Additional Info
P.S. We'll likely need to update your tech spec as project and product progresses.
