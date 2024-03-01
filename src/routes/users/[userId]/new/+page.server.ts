// import type { Actions, PageServerLoad, RequestEvent } from '../$types';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { redirect } from "@sveltejs/kit";
import type { Actions, RequestEvent } from "./$types";
import { createAssessmentTemplate } from '../../../api/services/assessment-template';
import chalk from 'chalk';

////////////////////////////////////////////////////////

const createAssessmentTemplateSchema = zfd.formData({
	title: z.string().min(3).max(256),
	description: z.string().optional(),
	type: z.string().min(3).max(20),
	provider: z.string().optional(),
	providerAssessmentCode: z.string().optional(),
	serveListNodeChildrenAtOnce: zfd.checkbox(),
	scoringApplicable: zfd.checkbox()
});

export const actions = {
	new: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		console.log("User id from new : ", userId)
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type AssessmentTemplateSchema = z.infer<typeof createAssessmentTemplateSchema>;
		let result: AssessmentTemplateSchema = {};

		try {
			result = createAssessmentTemplateSchema.parse(formData);

		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();

			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}

		const response = await createAssessmentTemplate(
			sessionId,
			result.title,
			result.description,
			result.type,
			result.provider,
			result.providerAssessmentCode,
			result.serveListNodeChildrenAtOnce,
			result.scoringApplicable
		);

		const assessmentId = response.Data.AssessmentTemplate.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				`/users/${userId}/new`,
			);
		}
		throw redirect(

			303,
			`/users/${userId}/new/${assessmentId}/question`,

		);
	},
} satisfies Actions;


