"use strict";
// src/modules/contacts/services/contacts.service.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
var contact_entity_1 = require("../entities/contact.entity");
var contact_relationship_entity_1 = require("../entities/contact-relationship.entity");
var medical_history_entity_1 = require("../../medical-history/medical-history.entity");
var appointment_entity_1 = require("../../appointments/entities/appointment.entity");
var document_entity_1 = require("../../documents/entities/document.entity");
/**
 * Gets the inverse relationship type for bidirectional relationships
 * @param type The original relationship type
 * @returns The inverse relationship type or undefined
 */
function getInverseRelationshipType(type) {
    var _a;
    var inverseMap = (_a = {},
        _a[contact_relationship_entity_1.RelationshipType.SPOUSE] = contact_relationship_entity_1.RelationshipType.SPOUSE,
        _a[contact_relationship_entity_1.RelationshipType.PARENT] = contact_relationship_entity_1.RelationshipType.CHILD,
        _a[contact_relationship_entity_1.RelationshipType.CHILD] = contact_relationship_entity_1.RelationshipType.PARENT,
        _a[contact_relationship_entity_1.RelationshipType.SIBLING] = contact_relationship_entity_1.RelationshipType.SIBLING,
        _a[contact_relationship_entity_1.RelationshipType.GUARDIAN] = contact_relationship_entity_1.RelationshipType.DEPENDENT,
        _a[contact_relationship_entity_1.RelationshipType.DEPENDENT] = contact_relationship_entity_1.RelationshipType.GUARDIAN,
        _a[contact_relationship_entity_1.RelationshipType.EMERGENCY_CONTACT] = contact_relationship_entity_1.RelationshipType.OTHER,
        _a[contact_relationship_entity_1.RelationshipType.PRIMARY_CARE_PROVIDER] = contact_relationship_entity_1.RelationshipType.OTHER,
        _a[contact_relationship_entity_1.RelationshipType.SPECIALIST] = contact_relationship_entity_1.RelationshipType.OTHER,
        _a[contact_relationship_entity_1.RelationshipType.CAREGIVER] = contact_relationship_entity_1.RelationshipType.OTHER,
        _a[contact_relationship_entity_1.RelationshipType.RELATIVE] = contact_relationship_entity_1.RelationshipType.RELATIVE,
        _a[contact_relationship_entity_1.RelationshipType.COLLEAGUE] = contact_relationship_entity_1.RelationshipType.COLLEAGUE,
        _a[contact_relationship_entity_1.RelationshipType.FRIEND] = contact_relationship_entity_1.RelationshipType.FRIEND,
        _a[contact_relationship_entity_1.RelationshipType.OTHER] = contact_relationship_entity_1.RelationshipType.OTHER,
        _a);
    return inverseMap[type];
}
var ContactsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ContactsService = _classThis = /** @class */ (function () {
        function ContactsService_1(contactRepository, relationshipRepository, medicalHistoryRepository, appointmentRepository, documentRepository, dataSource) {
            this.contactRepository = contactRepository;
            this.relationshipRepository = relationshipRepository;
            this.medicalHistoryRepository = medicalHistoryRepository;
            this.appointmentRepository = appointmentRepository;
            this.documentRepository = documentRepository;
            this.dataSource = dataSource;
        }
        ContactsService_1.prototype.create = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var existingContact, documentIds, contactData, contact, documents, savedContact;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.contactRepository.findOne({
                                where: [
                                    { email: data.email, organizationId: data.organizationId },
                                    { phone: data.phone, organizationId: data.organizationId },
                                ],
                            })];
                        case 1:
                            existingContact = _a.sent();
                            if (existingContact) {
                                throw new common_1.ConflictException('Contact with this email or phone number already exists');
                            }
                            documentIds = data.documents, contactData = __rest(data, ["documents"]);
                            contact = new contact_entity_1.Contact();
                            Object.assign(contact, contactData);
                            // Set createdBy properly - use the string ID directly instead of object
                            contact.createdById = data.createdBy;
                            if (!(documentIds && Array.isArray(documentIds))) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.documentRepository.find({
                                    where: { id: (0, typeorm_1.In)(documentIds) }
                                })];
                        case 2:
                            documents = _a.sent();
                            // If documents exist, assign them to the contact
                            if (documents.length > 0) {
                                contact.documents = documents;
                            }
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.contactRepository.save(contact)];
                        case 4:
                            savedContact = _a.sent();
                            return [2 /*return*/, savedContact];
                    }
                });
            });
        };
        ContactsService_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, organizationId, search, type, isActive, _b, page, _c, limit, filters, queryBuilder;
                return __generator(this, function (_d) {
                    _a = query, organizationId = _a.organizationId, search = _a.search, type = _a.type, isActive = _a.isActive, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, filters = __rest(_a, ["organizationId", "search", "type", "isActive", "page", "limit"]);
                    queryBuilder = this.contactRepository.createQueryBuilder('contact')
                        .where('contact.organizationId = :organizationId', { organizationId: organizationId });
                    if (search) {
                        queryBuilder.andWhere('(LOWER(contact.firstName) LIKE LOWER(:search) OR LOWER(contact.lastName) LIKE LOWER(:search) OR LOWER(contact.email) LIKE LOWER(:search))', { search: "%".concat(search, "%") });
                    }
                    if (type) {
                        queryBuilder.andWhere('contact.type = :type', { type: type });
                    }
                    if (isActive !== undefined) {
                        queryBuilder.andWhere('contact.isActive = :isActive', { isActive: isActive });
                    }
                    Object.keys(filters).forEach(function (key) {
                        var _a;
                        queryBuilder.andWhere("contact.".concat(key, " = :").concat(key), (_a = {}, _a[key] = filters[key], _a));
                    });
                    // Fixed pagination by using explicit type parameter
                    return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page: page, limit: limit })];
                });
            });
        };
        ContactsService_1.prototype.search = function (searchTerm, query) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, _a, page, _b, limit, queryBuilder;
                return __generator(this, function (_c) {
                    organizationId = query.organizationId, _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b;
                    queryBuilder = this.contactRepository.createQueryBuilder('contact')
                        .where('contact.organizationId = :organizationId', { organizationId: organizationId })
                        .andWhere('(LOWER(contact.firstName) LIKE LOWER(:search) OR LOWER(contact.lastName) LIKE LOWER(:search) OR LOWER(contact.email) LIKE LOWER(:search) OR contact.phone LIKE :search)', { search: "%".concat(searchTerm, "%") });
                    // Fixed pagination by using explicit type parameter
                    return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page: page, limit: limit })];
                });
            });
        };
        ContactsService_1.prototype.findOne = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var contact;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.contactRepository.findOne({
                                where: { id: id, organizationId: organizationId },
                                relations: ['documents', 'appointments', 'medicalHistory'],
                            })];
                        case 1:
                            contact = _a.sent();
                            if (!contact) {
                                throw new common_1.NotFoundException('Contact not found');
                            }
                            return [2 /*return*/, contact];
                    }
                });
            });
        };
        ContactsService_1.prototype.update = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var contact, whereCondition, existingContact;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, data.organizationId)];
                        case 1:
                            contact = _a.sent();
                            if (!(data.email || data.phone)) return [3 /*break*/, 3];
                            whereCondition = [];
                            if (data.email) {
                                whereCondition.push({ email: data.email, organizationId: data.organizationId, id: (0, typeorm_1.Not)(id) });
                            }
                            if (data.phone) {
                                whereCondition.push({ phone: data.phone, organizationId: data.organizationId, id: (0, typeorm_1.Not)(id) });
                            }
                            return [4 /*yield*/, this.contactRepository.findOne({
                                    where: whereCondition,
                                })];
                        case 2:
                            existingContact = _a.sent();
                            if (existingContact) {
                                throw new common_1.ConflictException('Contact with this email or phone number already exists');
                            }
                            _a.label = 3;
                        case 3:
                            // Update the updatedById field instead of trying to create a relation
                            Object.assign(contact, __assign(__assign({}, data), { updatedById: data.updatedBy }));
                            return [2 /*return*/, this.contactRepository.save(contact)];
                    }
                });
            });
        };
        ContactsService_1.prototype.remove = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var contact;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, organizationId)];
                        case 1:
                            contact = _a.sent();
                            return [4 /*yield*/, this.contactRepository.softRemove(contact)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ContactsService_1.prototype.merge = function (primaryId, secondaryId, context) {
            return __awaiter(this, void 0, void 0, function () {
                var queryRunner, _a, primary, secondary, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            queryRunner = this.dataSource.createQueryRunner();
                            return [4 /*yield*/, queryRunner.connect()];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, queryRunner.startTransaction()];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, 11, 13, 15]);
                            return [4 /*yield*/, Promise.all([
                                    this.findOne(primaryId, context.organizationId),
                                    this.findOne(secondaryId, context.organizationId),
                                ])];
                        case 4:
                            _a = _b.sent(), primary = _a[0], secondary = _a[1];
                            // Merge basic information (keeping primary's core data)
                            if (!primary.middleName)
                                primary.middleName = secondary.middleName;
                            // if (!primary.mobilePhone) primary.mobilePhone = secondary.mobilePhone;
                            // Handle properties that might not exist on the Contact entity
                            if ('alternativePhoneNumber' in primary && 'alternativePhoneNumber' in secondary) {
                                if (!primary.alternativePhoneNumber)
                                    primary.alternativePhoneNumber = secondary.alternativePhoneNumber;
                            }
                            if ('allergies' in primary && 'allergies' in secondary) {
                                if (!primary.allergies)
                                    primary.allergies = secondary.allergies;
                                // Merge arrays if both exist
                                if (primary.allergies && secondary.allergies) {
                                    primary.allergies = __spreadArray([], new Set(__spreadArray(__spreadArray([], primary.allergies, true), secondary.allergies, true)), true);
                                }
                            }
                            if ('medications' in primary && 'medications' in secondary) {
                                if (!primary.medications)
                                    primary.medications = secondary.medications;
                                // Merge arrays if both exist
                                if (primary.medications && secondary.medications) {
                                    primary.medications = __spreadArray([], new Set(__spreadArray(__spreadArray([], primary.medications, true), secondary.medications, true)), true);
                                }
                            }
                            // Safely merge metadata objects
                            if (primary.metadata && secondary.metadata) {
                                primary.metadata = __assign(__assign({}, secondary.metadata), primary.metadata);
                            }
                            else if (secondary.metadata) {
                                primary.metadata = secondary.metadata;
                            }
                            // Update relationships
                            return [4 /*yield*/, queryRunner.manager
                                    .createQueryBuilder()
                                    .update(appointment_entity_1.Appointment)
                                    .set({ contactId: primaryId })
                                    .where("contactId = :secondaryId", { secondaryId: secondaryId })
                                    .execute()];
                        case 5:
                            // Update relationships
                            _b.sent();
                            return [4 /*yield*/, queryRunner.manager
                                    .createQueryBuilder()
                                    .update(document_entity_1.Document)
                                    .set({ contactId: primaryId })
                                    .where("contactId = :secondaryId", { secondaryId: secondaryId })
                                    .execute()];
                        case 6:
                            _b.sent();
                            return [4 /*yield*/, queryRunner.manager
                                    .createQueryBuilder()
                                    .update(medical_history_entity_1.MedicalHistory)
                                    .set({ contactId: primaryId })
                                    .where("contactId = :secondaryId", { secondaryId: secondaryId })];
                        case 7:
                            _b.sent();
                            primary.mergedRecords = __spreadArray(__spreadArray([], (primary.mergedRecords || []), true), [secondary], false);
                            // Add to merged records if the property exists
                            if ('mergedRecords' in primary) {
                                primary.mergedRecords = __spreadArray(__spreadArray([], (primary.mergedRecords || []), true), [secondary], false);
                            }
                            // Mark secondary as inactive
                            secondary.status = 'INACTIVE';
                            return [4 /*yield*/, queryRunner.manager.save(contact_entity_1.Contact, primary)];
                        case 8:
                            _b.sent();
                            return [4 /*yield*/, queryRunner.manager.save(contact_entity_1.Contact, secondary)];
                        case 9:
                            _b.sent();
                            return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 10:
                            _b.sent();
                            return [2 /*return*/, primary];
                        case 11:
                            error_1 = _b.sent();
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 12:
                            _b.sent();
                            throw error_1;
                        case 13: return [4 /*yield*/, queryRunner.release()];
                        case 14:
                            _b.sent();
                            return [7 /*endfinally*/];
                        case 15: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Gets all relationships for a contact
         */
        ContactsService_1.prototype.getRelationships = function (id_1, organizationId_1) {
            return __awaiter(this, arguments, void 0, function (id, organizationId, includeInactive) {
                var queryBuilder;
                if (includeInactive === void 0) { includeInactive = false; }
                return __generator(this, function (_a) {
                    queryBuilder = this.relationshipRepository.createQueryBuilder('relationship')
                        .leftJoinAndSelect('relationship.relatedContact', 'relatedContact')
                        .where('relationship.contactId = :id', { id: id })
                        .andWhere('relationship.organizationId = :organizationId', { organizationId: organizationId });
                    if (!includeInactive) {
                        queryBuilder.andWhere('relationship.isActive = true');
                    }
                    return [2 /*return*/, queryBuilder.getMany()];
                });
            });
        };
        /**
         * Creates a new relationship between two contacts
         * If the relationship is bidirectional, creates the inverse relationship too
         */
        ContactsService_1.prototype.createRelationship = function (contactId, relationshipDto, context) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, contact, relatedContact, existingRelationship, queryRunner, inverseType, relationship, savedRelationship, inverseRelationship, error_2;
                var _b, _c, _d, _e, _f, _g;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.findOne(contactId, context.organizationId),
                                this.findOne(relationshipDto.relatedContactId, context.organizationId),
                            ])];
                        case 1:
                            _a = _h.sent(), contact = _a[0], relatedContact = _a[1];
                            return [4 /*yield*/, this.relationshipRepository.findOne({
                                    where: {
                                        contactId: contactId,
                                        relatedContactId: relationshipDto.relatedContactId,
                                        organizationId: context.organizationId,
                                    },
                                })];
                        case 2:
                            existingRelationship = _h.sent();
                            if (existingRelationship) {
                                throw new common_1.BadRequestException('Relationship already exists between these contacts');
                            }
                            queryRunner = this.dataSource.createQueryRunner();
                            return [4 /*yield*/, queryRunner.connect()];
                        case 3:
                            _h.sent();
                            return [4 /*yield*/, queryRunner.startTransaction()];
                        case 4:
                            _h.sent();
                            _h.label = 5;
                        case 5:
                            _h.trys.push([5, 10, 12, 14]);
                            inverseType = relationshipDto.inverseType || getInverseRelationshipType(relationshipDto.type);
                            relationship = new contact_relationship_entity_1.ContactRelationship();
                            relationship.contactId = contactId;
                            relationship.relatedContactId = relationshipDto.relatedContactId;
                            relationship.type = relationshipDto.type;
                            relationship.inverseType = inverseType !== null && inverseType !== void 0 ? inverseType : contact_relationship_entity_1.RelationshipType.OTHER;
                            relationship.notes = (_b = relationshipDto.notes) !== null && _b !== void 0 ? _b : '';
                            relationship.isPrimary = relationshipDto.isPrimary || false;
                            relationship.startDate = (_c = relationshipDto.startDate) !== null && _c !== void 0 ? _c : new Date();
                            if (relationshipDto.endDate) {
                                relationship.endDate = relationshipDto.endDate;
                            }
                            relationship.metadata = (_d = relationshipDto.metadata) !== null && _d !== void 0 ? _d : {};
                            relationship.organizationId = context.organizationId;
                            relationship.createdById = context.userId;
                            return [4 /*yield*/, queryRunner.manager.save(relationship)];
                        case 6:
                            savedRelationship = _h.sent();
                            if (!(inverseType && inverseType !== contact_relationship_entity_1.RelationshipType.OTHER)) return [3 /*break*/, 8];
                            inverseRelationship = new contact_relationship_entity_1.ContactRelationship();
                            inverseRelationship.contactId = relationshipDto.relatedContactId;
                            inverseRelationship.relatedContactId = contactId;
                            inverseRelationship.type = inverseType;
                            inverseRelationship.inverseType = relationshipDto.type;
                            inverseRelationship.notes = (_e = relationshipDto.notes) !== null && _e !== void 0 ? _e : '';
                            inverseRelationship.isPrimary = relationshipDto.isPrimary || false;
                            inverseRelationship.startDate = (_f = relationshipDto.startDate) !== null && _f !== void 0 ? _f : new Date();
                            if (relationshipDto.endDate !== undefined) {
                                inverseRelationship.endDate = relationshipDto.endDate;
                            }
                            inverseRelationship.metadata = (_g = relationshipDto.metadata) !== null && _g !== void 0 ? _g : {};
                            inverseRelationship.organizationId = context.organizationId;
                            inverseRelationship.createdById = context.userId;
                            return [4 /*yield*/, queryRunner.manager.save(inverseRelationship)];
                        case 7:
                            _h.sent();
                            _h.label = 8;
                        case 8: return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 9:
                            _h.sent();
                            return [2 /*return*/, savedRelationship];
                        case 10:
                            error_2 = _h.sent();
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 11:
                            _h.sent();
                            throw error_2;
                        case 12: return [4 /*yield*/, queryRunner.release()];
                        case 13:
                            _h.sent();
                            return [7 /*endfinally*/];
                        case 14: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Updates an existing relationship between contacts
         * If the relationship is bidirectional, updates the inverse relationship too
         */
        ContactsService_1.prototype.updateRelationship = function (id, updateDto, context) {
            return __awaiter(this, void 0, void 0, function () {
                var relationship, queryRunner, savedRelationship, inverseRelationship, error_3;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.relationshipRepository.findOne({
                                where: { id: id, organizationId: context.organizationId },
                                relations: ['contact', 'relatedContact'],
                            })];
                        case 1:
                            relationship = _b.sent();
                            if (!relationship) {
                                throw new common_1.NotFoundException('Relationship not found');
                            }
                            queryRunner = this.dataSource.createQueryRunner();
                            return [4 /*yield*/, queryRunner.connect()];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, queryRunner.startTransaction()];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            _b.trys.push([4, 10, 12, 14]);
                            // Update the primary relationship
                            if (updateDto.type !== undefined) {
                                relationship.type = updateDto.type;
                            }
                            if (updateDto.inverseType !== undefined) {
                                relationship.inverseType = updateDto.inverseType;
                            }
                            else if (updateDto.type !== undefined) {
                                // Update inverse type based on new type if type changed
                                relationship.inverseType = (_a = getInverseRelationshipType(updateDto.type)) !== null && _a !== void 0 ? _a : contact_relationship_entity_1.RelationshipType.OTHER;
                            }
                            if (updateDto.notes !== undefined) {
                                relationship.notes = updateDto.notes;
                            }
                            if (updateDto.isPrimary !== undefined) {
                                relationship.isPrimary = updateDto.isPrimary;
                            }
                            if (updateDto.isActive !== undefined) {
                                relationship.isActive = updateDto.isActive;
                            }
                            if (updateDto.startDate !== undefined) {
                                relationship.startDate = updateDto.startDate;
                            }
                            if (updateDto.endDate !== undefined) {
                                relationship.endDate = updateDto.endDate;
                            }
                            if (updateDto.metadata !== undefined) {
                                relationship.metadata = updateDto.metadata;
                            }
                            relationship.updatedById = context.userId;
                            return [4 /*yield*/, queryRunner.manager.save(relationship)];
                        case 5:
                            savedRelationship = _b.sent();
                            return [4 /*yield*/, this.relationshipRepository.findOne({
                                    where: {
                                        contactId: relationship.relatedContactId,
                                        relatedContactId: relationship.contactId,
                                        organizationId: context.organizationId,
                                    },
                                })];
                        case 6:
                            inverseRelationship = _b.sent();
                            if (!inverseRelationship) return [3 /*break*/, 8];
                            // Update the inverse relationship with corresponding values
                            if (relationship.inverseType !== undefined) {
                                inverseRelationship.type = relationship.inverseType;
                            }
                            if (relationship.type !== undefined) {
                                inverseRelationship.inverseType = relationship.type;
                            }
                            if (updateDto.notes !== undefined) {
                                inverseRelationship.notes = updateDto.notes;
                            }
                            if (updateDto.isPrimary !== undefined) {
                                inverseRelationship.isPrimary = updateDto.isPrimary;
                            }
                            if (updateDto.isActive !== undefined) {
                                inverseRelationship.isActive = updateDto.isActive;
                            }
                            if (updateDto.startDate !== undefined) {
                                inverseRelationship.startDate = updateDto.startDate;
                            }
                            if (updateDto.endDate !== undefined) {
                                inverseRelationship.endDate = updateDto.endDate;
                            }
                            if (updateDto.metadata !== undefined) {
                                inverseRelationship.metadata = updateDto.metadata;
                            }
                            inverseRelationship.updatedById = context.userId;
                            return [4 /*yield*/, queryRunner.manager.save(inverseRelationship)];
                        case 7:
                            _b.sent();
                            _b.label = 8;
                        case 8: return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 9:
                            _b.sent();
                            return [2 /*return*/, savedRelationship];
                        case 10:
                            error_3 = _b.sent();
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 11:
                            _b.sent();
                            throw error_3;
                        case 12: return [4 /*yield*/, queryRunner.release()];
                        case 13:
                            _b.sent();
                            return [7 /*endfinally*/];
                        case 14: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Deletes a relationship between contacts
         * If the relationship is bidirectional, deletes the inverse relationship too
         */
        ContactsService_1.prototype.deleteRelationship = function (id, context) {
            return __awaiter(this, void 0, void 0, function () {
                var relationship, queryRunner, inverseRelationship, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.relationshipRepository.findOne({
                                where: { id: id, organizationId: context.organizationId },
                            })];
                        case 1:
                            relationship = _a.sent();
                            if (!relationship) {
                                throw new common_1.NotFoundException('Relationship not found');
                            }
                            queryRunner = this.dataSource.createQueryRunner();
                            return [4 /*yield*/, queryRunner.connect()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, queryRunner.startTransaction()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 10, 12, 14]);
                            return [4 /*yield*/, this.relationshipRepository.findOne({
                                    where: {
                                        contactId: relationship.relatedContactId,
                                        relatedContactId: relationship.contactId,
                                        organizationId: context.organizationId,
                                    },
                                })];
                        case 5:
                            inverseRelationship = _a.sent();
                            // Delete the primary relationship
                            return [4 /*yield*/, queryRunner.manager.softRemove(relationship)];
                        case 6:
                            // Delete the primary relationship
                            _a.sent();
                            if (!inverseRelationship) return [3 /*break*/, 8];
                            return [4 /*yield*/, queryRunner.manager.softRemove(inverseRelationship)];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8: return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 9:
                            _a.sent();
                            return [3 /*break*/, 14];
                        case 10:
                            error_4 = _a.sent();
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 11:
                            _a.sent();
                            throw error_4;
                        case 12: return [4 /*yield*/, queryRunner.release()];
                        case 13:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 14: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Gets all contacts related to a contact by a specific relationship type
         */
        ContactsService_1.prototype.getContactsByRelationshipType = function (contactId, type, query) {
            return __awaiter(this, void 0, void 0, function () {
                var relationships;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.relationshipRepository.find({
                                where: {
                                    contactId: contactId,
                                    type: type,
                                    organizationId: query.organizationId,
                                    isActive: true,
                                },
                                relations: ['relatedContact'],
                            })];
                        case 1:
                            relationships = _a.sent();
                            return [2 /*return*/, relationships.map(function (rel) { return ({
                                    relationshipId: rel.id,
                                    relationshipType: rel.type,
                                    contact: {
                                        id: rel.relatedContact.id,
                                        firstName: rel.relatedContact.firstName,
                                        lastName: rel.relatedContact.lastName,
                                        email: rel.relatedContact.email,
                                        phone: rel.relatedContact.phone,
                                    },
                                    notes: rel.notes,
                                    isPrimary: rel.isPrimary,
                                    startDate: rel.startDate,
                                    endDate: rel.endDate,
                                }); })];
                    }
                });
            });
        };
        // Legacy method - kept for backward compatibility
        ContactsService_1.prototype.addRelationship = function (id, relationshipDto, context) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.createRelationship(id, relationshipDto, context)];
                });
            });
        };
        // Fixed getMedicalHistory method
        ContactsService_1.prototype.getMedicalHistory = function (id, query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.medicalHistoryRepository.find({
                            where: {
                                contactId: id,
                                organizationId: query.organizationId
                            },
                            order: { date: 'DESC' },
                        })];
                });
            });
        };
        ContactsService_1.prototype.getDocuments = function (id, query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.documentRepository.find({
                            where: {
                                contactId: id,
                                organizationId: query.organizationId
                            },
                            order: { createdAt: 'DESC' },
                        })];
                });
            });
        };
        ContactsService_1.prototype.addDocument = function (id, documentDto, context) {
            return __awaiter(this, void 0, void 0, function () {
                var document;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, context.organizationId)];
                        case 1:
                            _a.sent();
                            document = this.documentRepository.create(__assign(__assign({}, documentDto), { contactId: id, organizationId: context.organizationId, createdById: context.userId }));
                            return [2 /*return*/, this.documentRepository.save(document)];
                    }
                });
            });
        };
        ContactsService_1.prototype.getStatistics = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var stats;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.contactRepository
                                .createQueryBuilder('contact')
                                .where('contact.organizationId = :organizationId', { organizationId: query.organizationId })
                                .select([
                                'COUNT(*) as total',
                                'COUNT(CASE WHEN contact.type = \'PATIENT\' THEN 1 END) as patients',
                                'COUNT(CASE WHEN contact.status = \'ACTIVE\' THEN 1 END) as active',
                                'COUNT(CASE WHEN contact.createdAt >= NOW() - INTERVAL \'30 days\' THEN 1 END) as newLast30Days',
                            ])
                                .getRawOne()];
                        case 1:
                            stats = _a.sent();
                            return [2 /*return*/, stats];
                    }
                });
            });
        };
        ContactsService_1.prototype.importContacts = function (importDto, context) {
            return __awaiter(this, void 0, void 0, function () {
                var queryRunner, contacts, savedContacts, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryRunner = this.dataSource.createQueryRunner();
                            return [4 /*yield*/, queryRunner.connect()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, queryRunner.startTransaction()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 6, 8, 10]);
                            contacts = importDto.contacts.map(function (contactData) { return (__assign(__assign({}, contactData), { organizationId: context.organizationId, createdById: context.userId })); });
                            return [4 /*yield*/, queryRunner.manager.save(contact_entity_1.Contact, contacts)];
                        case 4:
                            savedContacts = _a.sent();
                            return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, {
                                    imported: savedContacts.length,
                                    contacts: savedContacts,
                                }];
                        case 6:
                            error_5 = _a.sent();
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 7:
                            _a.sent();
                            throw error_5;
                        case 8: return [4 /*yield*/, queryRunner.release()];
                        case 9:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        ContactsService_1.prototype.exportContacts = function (exportDto, context) {
            return __awaiter(this, void 0, void 0, function () {
                var queryBuilder, contacts, exportData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryBuilder = this.contactRepository.createQueryBuilder('contact')
                                .where('contact.organizationId = :organizationId', { organizationId: context.organizationId });
                            if (exportDto.filters) {
                                // Apply filters similar to findAll method
                            }
                            return [4 /*yield*/, queryBuilder.getMany()];
                        case 1:
                            contacts = _a.sent();
                            exportData = contacts.map(function (contact) { return ({
                                id: contact.id,
                                firstName: contact.firstName,
                                lastName: contact.lastName,
                                email: contact.email,
                                phone: contact.phone,
                                type: contact.type,
                                // Add other fields as needed
                            }); });
                            return [2 /*return*/, {
                                    exported: exportData.length,
                                    data: exportData,
                                }];
                    }
                });
            });
        };
        return ContactsService_1;
    }());
    __setFunctionName(_classThis, "ContactsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContactsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContactsService = _classThis;
}();
exports.ContactsService = ContactsService;
//# sourceMappingURL=contacts.service.js.map