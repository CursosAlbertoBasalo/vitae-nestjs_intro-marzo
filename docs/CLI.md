```bash
#===========================
# 0 . Initialize the project
#===========================

# Generate app
npx nest new nest-intro -p npm
# Run in dev mode
cd nest-intro
npm run start:dev

#===========================
# 1 . Modules
#===========================


# Generate feature module
nest g module agencies
# Generate route controller
nest g controller agencies
# Generate service
nest g service agencies
# Generate models
nest g class agencies/entities/agency.entity --no-spec
nest g class agencies/dto/create-agency.dto --no-spec
nest g class agencies/dto/update-agency.dto --no-spec

# Generate feature module with all components
npm i @nestjs/mapped-types
nest g resource trips
nest g resource bookings

#===========================
# 2 . Blocks
#===========================

# Generate a module for core (common) blocks
nest g module core
nest g pipe core/pipes/positive-number
nest g filter core/filters/business-error
nest g middleware core/middlewares/monitor

# Class validation
npm i class-validator class-transformer
nest g class agencies/dto/create-agency.dto --no-spec

# Basic Auth functionality
nest g class auth/dto/registration.dto --no-spec
nest g class auth/dto/login.dto --no-spec
nest g class auth/dto/credentials.dto --no-spec
nest g class auth/entities/user.entity --no-spec

# Filter for unauthorized errors
nest g filter core/filters/unauthorized-error

#===========================
# 3 . Security
#===========================

# Express security basics
npm i helmet
npm i @nestjs/throttler

# A guard to check headers
nest g guard core/guards/api-key

# Using Passport and JWT to identify users
npm i @nestjs/passport passport
npm i @nestjs/jwt passport-jwt
npm i --save-dev @types/passport-jwt

# A service to verify JWT tokens
nest g service auth/jwt-strategy --flat --no-spec

# A parameter decorator to get the user from the request
code src/auth/user.decorator.ts

#===========================
# 4 . NoSql with MongoDB
#===========================

#===========================
# 5 . SQL with PostgreSQL
#===========================

#===========================
# 6 . Production ready
#===========================

```
