import { zfd } from 'zod-form-data';
import { getAssessmentNodeById, getQueryResponseTypes, searchAssessmentNodes, updateAssessmentNode } from '../../../../../../api/services/node';
import { error, redirect, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';
import { z } from 'zod';
import type { PageServerLoad } from '../$types';


export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const assessmentTemplateId = event.params.assessmentId;
		const assessmentNodeId = event.params.questionId;
		console.log("This is server", assessmentNodeId)
		const searchParams = {
			templateId: assessmentTemplateId
		};
		const _queryResponseTypes = await getQueryResponseTypes(sessionId);
		const _assessmentNodes = await searchAssessmentNodes(sessionId, searchParams);
		const response = await getAssessmentNodeById(sessionId, assessmentTemplateId, assessmentNodeId);
		// const response = await getAssessmentTemplateById(sessionId, assessmentTemplateId);
		// const _assessmentNodes = await searchAssessmentNodes(sessionId, searchParams);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessmentNodes = _assessmentNodes.Data.AssessmentNodeRecords.Items;
		// console.log(`this is assessmentNodes ${assessmentNodes}`)

		const assessmentNode = response.Data.AssessmentNode;
		// console.log(`this is assessmentNode ${assessmentNode}`)

		const queryResponseTypes = _queryResponseTypes.Data.QueryResponseTypes;
		// console.log(`this is queryResponseTypes ${queryResponseTypes}`)

		// const id = response.Data.AssessmentTemplate.id;


		return {
			// location: `${id}/edit`,
			assessmentNode,
			queryResponseTypes,
			assessmentNodes,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessment template: ${error.message}`);
	}
};


const updateAssessmentNodeSchema = zfd.formData({
	nodeType: z.string(),
	title: z.string().min(8).max(256),
	description: z.string().optional(),
	queryType: z.string().optional(),
	resolutionScore: zfd.numeric(z.number().default(1)),
	providerAssessmentCode: z.string().optional(),
	message: z.string().optional(),
	serveListNodeChildrenAtOnce: zfd.checkbox({ trueValue: 'true' }),
	scoringApplicable: zfd.checkbox({ trueValue: 'true' }),
	options: z.array(z.string()),
	sequence: zfd.numeric(z.number().optional()),
});


export const actions = {
	update: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const templateId = event.params.assessmentId;
		const assessmentNodeId = event.params.questionId;
		const scoreConditionId = event.params.scoreConditionId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const options = data.has('options') ? data.getAll('options') : [];
		const formData = Object.fromEntries(data);
		const formDataValue = { ...formData, options: options };

		type AssessmentNodeSchema = z.infer<typeof updateAssessmentNodeSchema>;

		let result: AssessmentNodeSchema = {};
		try {
			result = updateAssessmentNodeSchema.parse(formDataValue);
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

		const response = await updateAssessmentNode(
			sessionId,
			templateId,
			assessmentNodeId,
			result.nodeType,
			result.title,
			result.description,
			result.queryType,
			result.options,
			result.message,
			result.sequence,
		);

		const nodeId = response.Data.AssessmentNode.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(
				303,
				`/users/${userId}/new/${templateId}/question/${assessmentNodeId}`,
			);
		}
		throw redirect(
			303,
			`/users/${userId}/new/${templateId}/question`,
		);
	}
} 
