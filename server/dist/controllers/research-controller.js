import { researchRequestSchema } from "../schemas/research-request.js";
import { createQueuedResearch } from "../services/research-service.js";
import { HttpError } from "../middleware/error-handler.js";
export function createResearch(req, res, next) {
    try {
        const parsed = researchRequestSchema.safeParse(req.body);
        if (!parsed.success) {
            const issue = parsed.error.issues[0];
            next(new HttpError(400, issue?.message ?? "Invalid research request."));
            return;
        }
        const research = createQueuedResearch(parsed.data);
        res.status(202).json({
            success: true,
            researchId: research.researchId,
            status: research.status,
        });
    }
    catch (error) {
        next(error);
    }
}
