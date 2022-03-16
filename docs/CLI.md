```bash
# Generate app
npx nest new nest-intro -p npm
# Run in dev mode
cd nest-intro
npm run start:dev

# Generate feature module
nest g module agencies
# Generate route controller
nest g controller agencies
# Generate service
nest g service agencies
# Generate models
nest g class agencies/dto/agency.dto --no-spec
nest g class agencies/dto/create-agency.dto --no-spec
nest g class agencies/dto/update-agency.dto --no-spec

# Generate feature module with all components
npm i @nestjs/mapped-types
nest g resource trips
nest g resource bookings
```
