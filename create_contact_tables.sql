-- Create contacts table
CREATE TABLE public.contacts (
                                 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                 "tenantId" UUID NOT NULL,
                                 "organizationId" UUID NOT NULL,
                                 status VARCHAR(50) DEFAULT 'ACTIVE',
                                 metadata JSONB,
                                 phone VARCHAR(50),
                                 type VARCHAR(50) DEFAULT 'PATIENT',
                                 "familyId" UUID,
                                 "firstName" VARCHAR(100) NOT NULL,
                                 "lastName" VARCHAR(100) NOT NULL,
                                 "middleName" VARCHAR(100),
                                 "preferredName" VARCHAR(100),
                                 email VARCHAR(255),
                                 "phoneNumber" VARCHAR(50),
                                 "alternativePhoneNumber" VARCHAR(50),
                                 gender VARCHAR(50),
                                 "dateOfBirth" DATE,
                                 "maritalStatus" VARCHAR(50),
                                 "bloodType" VARCHAR(20),
                                 address JSONB,
                                 "emergencyContacts" JSONB,
                                 allergies TEXT[],
                                 medications TEXT[],
                                 insurance JSONB,
                                 occupation VARCHAR(255),
                                 employment JSONB,
                                 "familyHistory" TEXT,
                                 "socialHistory" TEXT,
                                 "medicalConditions" JSONB,
                                 immunizations JSONB,
                                 notes TEXT,
                                 "customFields" JSONB,
                                 "isActive" BOOLEAN DEFAULT true,
                                 "lastVisitDate" TIMESTAMP,
                                 "nextAppointmentDate" TIMESTAMP,
                                 "createdById" UUID,
                                 "updatedById" UUID,
                                 "createdAt" TIMESTAMP DEFAULT NOW(),
                                 "updatedAt" TIMESTAMP DEFAULT NOW(),
                                 "deletedAt" TIMESTAMP
);

-- Create contact_relationships table
CREATE TABLE public.contact_relationships (
                                              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                              "tenantId" UUID NOT NULL,
                                              "organizationId" UUID NOT NULL,
                                              "contactId" UUID NOT NULL,
                                              "relatedContactId" UUID NOT NULL,
                                              type VARCHAR(50) NOT NULL,
                                              "inverseType" VARCHAR(50),
                                              "familyId" UUID,
                                              notes TEXT,
                                              "isPrimary" BOOLEAN DEFAULT false,
                                              "isActive" BOOLEAN DEFAULT true,
                                              "startDate" TIMESTAMP DEFAULT NOW(),
                                              "endDate" TIMESTAMP,
                                              metadata JSONB,
                                              "createdById" UUID,
                                              "updatedById" UUID,
                                              "createdAt" TIMESTAMP DEFAULT NOW(),
                                              "updatedAt" TIMESTAMP DEFAULT NOW(),
                                              "deletedAt" TIMESTAMP,

                                              FOREIGN KEY ("contactId") REFERENCES public.contacts(id),
                                              FOREIGN KEY ("relatedContactId") REFERENCES public.contacts(id)
);

-- Create merged_records table
CREATE TABLE public.merged_records (
                                       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                       "tenantId" UUID NOT NULL,
                                       "organizationId" UUID NOT NULL,
                                       "primaryContactId" UUID NOT NULL,
                                       "secondaryContactId" UUID NOT NULL,
                                       metadata JSONB,
                                       "createdById" UUID,
                                       "createdAt" TIMESTAMP DEFAULT NOW(),

                                       FOREIGN KEY ("primaryContactId") REFERENCES public.contacts(id),
                                       FOREIGN KEY ("secondaryContactId") REFERENCES public.contacts(id)
);

-- Create medical_history table
CREATE TABLE public.medical_history (
                                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                        "tenantId" UUID NOT NULL,
                                        "organizationId" UUID NOT NULL,
                                        "contactId" UUID NOT NULL,
                                        type VARCHAR(100) NOT NULL,
                                        date TIMESTAMP NOT NULL,
                                        description TEXT NOT NULL,
                                        notes TEXT,
                                        attachments JSONB,
                                        "providerId" UUID,
                                        "createdById" UUID,
                                        "updatedById" UUID,
                                        "createdAt" TIMESTAMP DEFAULT NOW(),
                                        "updatedAt" TIMESTAMP DEFAULT NOW(),
                                        "deletedAt" TIMESTAMP,

                                        FOREIGN KEY ("contactId") REFERENCES public.contacts(id)
);

-- Create documents table
CREATE TABLE public.documents (
                                  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                  "tenantId" UUID NOT NULL,
                                  "organizationId" UUID NOT NULL,
                                  "contactId" UUID,
                                  name VARCHAR(255) NOT NULL,
                                  type VARCHAR(100) NOT NULL,
                                  path VARCHAR(500) NOT NULL,
                                  size INTEGER,
                                  "contentType" VARCHAR(100),
                                  "isPublic" BOOLEAN DEFAULT false,
                                  tags TEXT[],
                                  category VARCHAR(100),
                                  "createdById" UUID,
                                  "updatedById" UUID,
                                  "createdAt" TIMESTAMP DEFAULT NOW(),
                                  "updatedAt" TIMESTAMP DEFAULT NOW(),
                                  "deletedAt" TIMESTAMP,

                                  FOREIGN KEY ("contactId") REFERENCES public.contacts(id)
);

-- Create UUID extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";