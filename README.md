# disqo-demo

> Next Gen e-Commerce solution prototype



#### System requirements. 

1. Node >= 10
2. Redis >=3
3. Nats >= 2.1.4
4. Postgres >= 9.6  



 ####   Optional system requirements. 

 1. Docker
 2. Kubernetes/minikube
 3. Kubectl

#### Clone 
Clone this repo to your local machine using https://github.com/vahanNasibyan/dis-assignment.git


#### Setup

`cd dis-assignment && npm install`

### Usage

`npm run dev` or `npm start`

#### NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose

#### References 

1. [Roadmaps and KPI's](./docs/roadmaps_and_kpi's.md)
2. [Architechture overview](./docs/architecture_overview.md)
3. [Database UML diagram](./docs/assets/database.png) (NOTE: this is sample database diagram for simplicity)

4. [Project technical overwiew](./docs/technical_specifications/README.md)
5. [API microservice technical specification](./docs/technical_specifications/api-microservice.md)
6. [Authentication microservice technical specification](./docs/technical_specifications/auth-microservice.md)
7. [Deployment](./docs/deployments.md)
8. [API Documentation](https://documenter.getpostman.com/view/6358266/SzYaVdew?version=latest)

#### Contributing

Contribution guide TBD 

#### FAQ

FAQ section TBD

#### LICENSE 

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
