import React from 'react';
import clsx from "clsx";
import { useSelector, useDispatch } from 'react-redux';

import { FieldSetContainer } from "../form/form";
import formStyles from "../form/form.module.css";
import styles from "./master.module.css";

import { selectCurrentStep } from "../../services/reducers/master";
import { setStep } from "../../services/actions/master";

export const withGroups = groups => {
	return function MasterContainer({children, className, submitError, submitDisabled, ...props}) {
		const currentStep = useSelector(selectCurrentStep);
		const dispatch = useDispatch();

		const currentFields = groups[currentStep].fields;
		const lastStep = groups.length - 1;

		return <form 
			{...props}
			className={clsx(formStyles.form, className)}
		>
			<ul className={styles.container}>
				{groups.map((group, index) => <li 
					key={group.title}
					className={clsx(styles.item, {
						[styles.active]: currentStep === index
					})}
					onClick={() => {
						dispatch(setStep(index))
					}}
				>
					{group.title}
				</li>)}
			</ul>
			{React.Children.toArray(children).filter(child => {
				return currentFields.filter(name => child.key.includes(name)).length === 1;
			})}
			{submitError ? <p className={formStyles.error}>{submitError}</p> : null}
			<div className={clsx(formStyles.actions)}>
				<button 
					type="button"
					disabled={submitDisabled || (currentStep === 0)} 
					onClick={() => {
						dispatch(setStep(currentStep - 1))
					}}
				>
					Назад
				</button>
				<button 
					type="button"
					disabled={submitDisabled || (currentStep === lastStep)} 
					onClick={() => {
						dispatch(setStep(currentStep + 1))
					}}
				>
					Вперед
				</button>
				<button 
					type="submit"
					disabled={submitDisabled || (submitError ? false : (currentStep !== lastStep))} 
				>
					ОТПРАВИТЬ
				</button>
			</div>
		</form>;
	}
}