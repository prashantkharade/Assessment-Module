// import type { Actions, PageServerLoad, RequestEvent } from '../$types';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad, RequestEvent } from "./$types";
import { createFormTemplate, getAllFormTemplate } from '../../../api/services/form-template';
import chalk from 'chalk';

////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ cookies, depends }) => {

	depends('app:assessmentTemplate')
	try {
		// const response = await searchAssessmentTemplates(sessionId);
		const response = await getAllFormTemplate();
		// if (response.Status === 'failure' || response.HttpCode !== 200) {
		// 	throw error(response.HttpCode, response.Message);
		// }

		if (response.Status === 'success' || response.HttpCode !== 201) {
			// throw error(response.HttpCode, response.Message);
			// const res = JSON.stringify(response)
			// console.log("This is from 201",JSON.stringify(response));
			// console.log("This is from 201",response,"from server");
		}
		// const response1 = JSON.stringify(result);
		const assessmentTemplate = response.Data;
		// console.log(assessmentTemplate)
		return {
			assessmentTemplate,
			message: response.Message,
		};
	} catch (error) {
		console.error(`Error retriving assessment templates: ${error.message}`);
	}
};

const createFormTemplateSchema = zfd.formData({
	title: z.string().min(3).max(256),
	description: z.string().optional(),
	currentVersion: zfd.numeric().optional(),
	type: z.string(),
	displayCode: z.string().optional(),
	defaultSectionNumbering: zfd.checkbox(),
});

export const actions = {
	new: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		// console.log("User id from new : ", userId)
		// const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());
		// console.log(formData, "this is form data")

		type formTemplateSchema = z.infer<typeof createFormTemplateSchema>;
		let result: formTemplateSchema = {};

		try {
			result = createFormTemplateSchema.parse(formData);
			// console.log(result,"reesult in try")
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}
		// let defaultSectionNumbering = /^(true|1|t|y|yes)$/i.test(formData.defaultSectionNumbering);
		// console.log(result, "this is result")
		const rootSectionId = "9618c6a8-0555-4a14-95ec-1946ec09c8e0";
		const response = await createFormTemplate(
			result.title,
			result.description,
			result.currentVersion,
			result.type,
			result.displayCode,
			userId,
			rootSectionId,
			result.defaultSectionNumbering
		);
		console.log(chalk.hex('#09FA25')("this is from server",JSON.stringify(response),"page.server.ts file"));
		const templateId = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				`/users/${userId}/new`,
			);
		}
		throw redirect(

			303,
			`/users/${userId}/new/${templateId}/question`,

		);
	},
} satisfies Actions;


