import { error, type Actions, type RequestEvent } from "@sveltejs/kit";
import { searchAssessmentTemplates } from "../../../api/services/form-template";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, depends }) => {
	const sessionId = cookies.get('sessionId');
	depends('app:assessmentTemplate')
	try {
		const response = await searchAssessmentTemplates(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		// console.log(JSON.stringify(response));
		// const response = JSON.stringify(result);
		const assessmentTemplate = response.Data.AssessmentTemplateRecords;
		// console.log(assessmentTemplate)
		return {
			assessmentTemplate,
			sessionId,
			message: response.Message,
		};
	} catch (error) {
		console.error(`Error retriving assessment templates: ${error.message}`);
	}
};

export const actions = {
	review: async (event: RequestEvent) => {
		const request = event.request;
		const data = await request.formData();
		// const formData = Object.fromEntries(data);
		
		// const request = event.request;
		// const userId = event.params.userId;
		// console.log("User id from new : ", userId)
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());
		console.log(formData)
		const assessmentId = formData;
		console.log(assessmentId,"This is form data")
		// type AssessmentTemplateSchema = z.infer<typeof createAssessmentTemplateSchema>;
		// let result: AssessmentTemplateSchema = {};

		// try {
		// 	result = createAssessmentTemplateSchema.parse(formData);

		// } catch (err: any) {
		// 	const { fieldErrors: errors } = err.flatten();

		// 	const { ...rest } = formData;
		// 	return {
		// 		data: rest,
		// 		errors
		// 	};
		// }

		// const response = await createAssessmentTemplate(
		// 	sessionId,
		// 	result.title,
		// 	result.description,
		// 	result.type,
		// 	result.provider,
		// 	result.providerAssessmentCode,
		// 	result.serveListNodeChildrenAtOnce,
		// 	result.scoringApplicable
		// );

		// const assessmentId = response.Data.AssessmentTemplate.id;

		// const response = 

		// if (response.Status === 'failure' || response.HttpCode !== 201) {
		// 	throw redirect(
		// 		303,
		// 		`/users/${userId}/new`,
		// 	);
		// }
		// throw redirect(

		// 	303,
		// 	`/users/${userId}/new/${assessmentId}/question`,

		// );
	},
} satisfies Actions;