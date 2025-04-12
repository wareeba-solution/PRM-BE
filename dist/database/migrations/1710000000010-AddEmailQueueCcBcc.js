"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmailQueueCcBcc1710000000010 = void 0;
class AddEmailQueueCcBcc1710000000010 {
    constructor() {
        this.name = 'AddEmailQueueCcBcc1710000000010';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "email_queue" ADD "cc" text`);
        await queryRunner.query(`ALTER TABLE "email_queue" ADD "bcc" text`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "email_queue" DROP COLUMN "bcc"`);
        await queryRunner.query(`ALTER TABLE "email_queue" DROP COLUMN "cc"`);
    }
}
exports.AddEmailQueueCcBcc1710000000010 = AddEmailQueueCcBcc1710000000010;
//# sourceMappingURL=1710000000010-AddEmailQueueCcBcc.js.map