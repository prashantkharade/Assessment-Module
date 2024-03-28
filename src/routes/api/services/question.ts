import { BACKEND_API_URL } from '$env/static/private';
import chalk from 'chalk';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createQuestionNode = async (
	// sessionId: string,
	parentTemplateId: string,
	parentSectionId: string,
	title: string,
	description?: string,
	displayCode?: string,
	responseType?: string,
	score?: number,
	correctAnswer?: string,
	hint?: string,
	options?: string[],
	fileResourceId?: string,
	questionImageUrl?: string,
	rangeMin?: number,
	rangeMax?: number
) => {
	const body = {
		ParentTemplateId: parentTemplateId,
		ParentSectionId: parentSectionId,
		Title: title,
		Description: description ? description : null,
		DisplayCode: displayCode ? displayCode : null,
		ResponseType: responseType,
		Score: score ? score : null,
		CorrectAnswer: correctAnswer ? correctAnswer : null,
		Hint: hint ? hint : null,
		Options: options ? options : null,
		FileResourceId: fileResourceId ? fileResourceId : null,
		QuestionImageUrl: questionImageUrl ? questionImageUrl : null,
		RangeMin: rangeMin ? rangeMin : null,
		RangeMax: rangeMax ? rangeMax : null,

	};

	if (options && options.length > 0) {
		let count = 1;
		const options = [];
		for (const o of body.Options) {
			const option = {
				Text: o,
				Sequence: count
			};
			options.push(option);
			count = count + 1;
		}
		body.Options = options;
	}

	// let url: string;
	// if(!BACKEND_API_URL){
	// 	 url = `http//localhost:5555/api/v1/node`;
	// }else{
	const url = BACKEND_API_URL + `/question`;
	// }
	return await post_(url, body);
};

export const getQuestionNodeById = async (
	// sessionId: string,
	// templateId: string,
	nodeId: string
) => {
	console.log(`this is template id and this is node ${nodeId}`)
	const url = BACKEND_API_URL + `questions/${nodeId}`;
	return await get_(url);
};

export const getQuestionsByTemplateId = async (
	// sessionId: string,
	templateId: string,
	// nodeId: string
) => {
	console.log(`this is template id and this is node ${templateId}`)
	const url = BACKEND_API_URL + `/questions/by-template-id/${templateId}`;
	const res = await get_(url); 
	// console.log(res," this is result of node by templatet")
	return res
};

export const updateQuestion = async (
	qestionId: string,
	parentTemplateId: string,
	parentSectionId: string,
	title: string,
	description?: string,
	displayCode?: string,
	responseType?: string,
	score?: number,
	correctAnswer?: string,
	hint?: string,
	options?: string[],
	fileResourceId?: string,
	questionImageUrl?: string,
	rangeMin?: number,
	rangeMax?: number
) => {
	const body = {
		ParentTemplateId: parentTemplateId,
		ParentSectionId: parentSectionId,
		Title: title,
		Description: description ? description : null,
		DisplayCode: displayCode ? displayCode : null,
		ResponseType: responseType,
		Score: score ? score : null,
		CorrectAnswer: correctAnswer ? correctAnswer : null,
		Hint: hint ? hint : null,
		Options: options ? options : null,
		FileResourceId: fileResourceId ? fileResourceId : null,
		QuestionImageUrl: questionImageUrl ? questionImageUrl : null,
		RangeMin: rangeMin ? rangeMin : null,
		RangeMax: rangeMax ? rangeMax : null,
	};
	if (options && options.length > 0) {
		let count = 1;
		const options = [];
		for (const o of body.Options) {
			const option = {
				Text: o,
				Sequence: count
			};
			options.push(option);
			count = count + 1;
		}
		body.Options = options;
	}
	const url = BACKEND_API_URL + `/questions/${qestionId}`;
	return await put_(url, body);
};

export const deleteQuestion = async (
	questionId: string,
) => {
	const url = BACKEND_API_URL + `/questions/${questionId}`;
	return await delete_(url);
};


