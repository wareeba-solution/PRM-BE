"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMedicalHistoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_medical_history_dto_1 = require("./create-medical-history.dto");
class UpdateMedicalHistoryDto extends (0, mapped_types_1.PartialType)(create_medical_history_dto_1.CreateMedicalHistoryDto) {
}
exports.UpdateMedicalHistoryDto = UpdateMedicalHistoryDto;
//# sourceMappingURL=update-medical-history.dto.js.map