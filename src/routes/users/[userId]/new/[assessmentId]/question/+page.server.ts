import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { createQuestionNode, getQuestionsByTemplateId } from '../../../../../api/services/question';
import type { PageServerLoad } from './$types';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { getFormTemplateById } from '../../../../../api/services/form-template';

//////////////////////////////////////////////////////////////////////////////////////////


export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	// const sessionId = event.cookies.get('sessionId');

	event.depends('app:allNodes')

	try {
		const assessmentTemplateId = event.params.assessmentId;
		// const searchParams = {
		// 	templateId: assessmentTemplateId
		// };
		console.log("Assessment id is", assessmentTemplateId);
		// console.log("Assessment search params are", searchParams);
		const response = await getFormTemplateById( assessmentTemplateId);
		const _assessmentNodes = await getQuestionsByTemplateId( assessmentTemplateId);

		// console.log(response)
		// console.log(_assessmentNodes)
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
			// console.log("This is from 201",response,"from server");

		}
		const assessmentTemplate = response;
		const assessmentNodes = _assessmentNodes.Data;
		// const id = response.Data.AssessmentTemplate.id;
		// console.log("assessmentTemplate", assessmentNodes)
		return {
			assessmentTemplateId,			
			assessmentTemplate,
			assessmentNodes,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessment templates: ${error.message}`);
	}
};


const createAssessmentNodeSchema = zfd.formData({
	nodeType: z.string(),
	parentNodeId: z.string().uuid(),
	title: z.string().min(8).max(256),
	description: z.string().optional(),
	sequence: zfd.numeric(z.number().optional()),
	queryType: z.string().optional(),
	resolutionScore: zfd.numeric(z.number().default(1)),
	providerAssessmentCode: z.string().optional(),
	message: z.string().optional(),
	serveListNodeChildrenAtOnce: zfd.checkbox({ trueValue: 'true' }),
	scoringApplicable: zfd.checkbox({ trueValue: 'true' }),
	options: z.array(z.string())
});

export const actions = {
	createAssessmentNodeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const assessmentId = event.params.assessmentId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const options = data.has('options') ? data.getAll('options') : [];
		const formData = Object.fromEntries(data);
		const formDataValue = { ...formData, options: options };

		type AssessmentNodeSchema = z.infer<typeof createAssessmentNodeSchema>;
		console.log('result', formData);
		let result: AssessmentNodeSchema = {};
		try {
			result = createAssessmentNodeSchema.parse(formDataValue);
			console.log('result', result);
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}

		const parentNode = '2b3b3ea7-d55f-46fb-901f-380a92be0059';
		const response = await createQuestionNode(
			sessionId,
			assessmentId,
			parentNode,
			result.nodeType,
			result.title,
			result.description,
			result.message,
			result.serveListNodeChildrenAtOnce,
			result.queryType,
			result.options,
			result.sequence
		);

		const nodeId = response.Data.AssessmentNode.id;

		// console.log('scoringCondition', scoringCondition);

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `users/${userId}/new/${assessmentId}`);
		}
		throw redirect(
			303,
			`/users/${userId}/new/${assessmentId}/question`,

		);
	}
};



