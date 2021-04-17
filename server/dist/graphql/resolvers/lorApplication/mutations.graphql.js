"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = {
    createLORApplication(_, args, { prisma }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const draftUrl = (_a = args.draftURL) !== null && _a !== void 0 ? _a : undefined;
            const lorApp = yield prisma.lORApplication.create({
                data: {
                    dueDate: args.dueDate,
                    statementOfPurpose: args.statementOfPurpose,
                    course: args.course,
                    university: args.university,
                    draftURL: draftUrl,
                    studentID: args.studentID,
                    facultyID: args.facultyID,
                },
            });
            return lorApp;
        });
    },
};
//# sourceMappingURL=mutations.graphql.js.map