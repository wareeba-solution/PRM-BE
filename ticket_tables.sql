CREATE TABLE public.tickets (
                                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                "tenantId" UUID NOT NULL,
                                "organizationId" UUID NOT NULL,
                                "contactId" UUID,
                                "assigneeId" UUID,
                                "departmentId" UUID,
                                subject VARCHAR(255) NOT NULL,
                                description TEXT,
                                type VARCHAR(50) NOT NULL,
                                status VARCHAR(50) NOT NULL DEFAULT 'OPEN',
                                priority VARCHAR(50) NOT NULL DEFAULT 'MEDIUM',
                                category VARCHAR(100),
                                "dueDate" TIMESTAMP,
                                "completedAt" TIMESTAMP,
                                "isEscalated" BOOLEAN DEFAULT false,
                                "escalationReason" TEXT,
                                "escalatedAt" TIMESTAMP,
                                "escalatedById" UUID,
                                "reopenReason" TEXT,
                                "reopenedAt" TIMESTAMP,
                                "reopenedById" UUID,
                                resolution TEXT,
                                "resolvedAt" TIMESTAMP,
                                "resolvedById" UUID,
                                tags TEXT[],
                                metadata JSONB,
                                "createdById" UUID NOT NULL,
                                "updatedById" UUID,
                                "createdAt" TIMESTAMP DEFAULT NOW(),
                                "updatedAt" TIMESTAMP DEFAULT NOW(),
                                "deletedAt" TIMESTAMP
);

CREATE TABLE public.ticket_activities (
                                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                          "ticketId" UUID NOT NULL,
                                          "organizationId" UUID NOT NULL,
                                          "userId" UUID,
                                          action VARCHAR(100) NOT NULL,
                                          description TEXT,
                                          metadata JSONB,
                                          "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.ticket_comments (
                                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                        "ticketId" UUID NOT NULL,
                                        "userId" UUID NOT NULL,
                                        "organizationId" UUID NOT NULL,
                                        content TEXT NOT NULL,
                                        "isInternal" BOOLEAN DEFAULT false,
                                        "createdAt" TIMESTAMP DEFAULT NOW(),
                                        "updatedAt" TIMESTAMP DEFAULT NOW(),
                                        "deletedAt" TIMESTAMP
);

CREATE TABLE public.ticket_attachments (
                                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                           "ticketId" UUID NOT NULL,
                                           "organizationId" UUID NOT NULL,
                                           name VARCHAR(255) NOT NULL,
                                           path VARCHAR(500) NOT NULL,
                                           size INTEGER,
                                           "contentType" VARCHAR(100),
                                           "uploadedById" UUID NOT NULL,
                                           "createdAt" TIMESTAMP DEFAULT NOW(),
                                           "deletedAt" TIMESTAMP
);