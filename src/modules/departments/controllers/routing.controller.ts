import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RoutingService } from '../services/routing.service';
import { CreateRoutingRuleDto } from '../dto/create-routing-rule.dto';
import { UpdateRoutingRuleDto } from '../dto/update-routing-rule.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { OrganizationGuard } from '../../organizations/guards/organization.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';

@Controller('organizations/:organizationId/routing-rules')
@UseGuards(JwtAuthGuard, OrganizationGuard)
export class RoutingController {
    constructor(private readonly routingService: RoutingService) {}

    @Post()
    create(
        @Param('organizationId') organizationId: string,
        @Body() createRoutingRuleDto: CreateRoutingRuleDto,
        @CurrentUser() user: User,
    ) {
        return this.routingService.create(organizationId, createRoutingRuleDto, user.id);
    }

    @Get()
    findAll(
        @Param('organizationId') organizationId: string,
        @Query('departmentId') departmentId?: string,
    ) {
        return this.routingService.findAll(organizationId, departmentId);
    }

    @Get(':id')
    findOne(
        @Param('organizationId') organizationId: string,
        @Param('id') id: string,
    ) {
        return this.routingService.findOne(organizationId, id);
    }

    @Patch(':id')
    update(
        @Param('organizationId') organizationId: string,
        @Param('id') id: string,
        @Body() updateRoutingRuleDto: UpdateRoutingRuleDto,
    ) {
        return this.routingService.update(organizationId, id, updateRoutingRuleDto);
    }

    @Delete(':id')
    remove(
        @Param('organizationId') organizationId: string,
        @Param('id') id: string,
    ) {
        return this.routingService.remove(organizationId, id);
    }
} 