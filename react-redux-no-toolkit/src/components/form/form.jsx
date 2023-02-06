import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./form.module.css";
import { Input } from "./input";
import { selectFormData, selectFormState } from "../../services/reducers/form";
import { setFormData, submitForm } from "../../services/actions/form";
import clsx from "clsx";

export const FormContainer = ({children, className, submitError, submitDisabled, ...props}) => <form 
	{...props}
	className={clsx(styles.form, className)}
>
	{children}
	{submitError ? <p className={styles.error}>{submitError}</p> : null}
	<div className={clsx(styles.actions)}>
		<button 
			disabled={submitDisabled} 
			type="submit"
		>
			ОТПРАВИТЬ
		</button>
	</div>
</form>;

//если нам захочется группировать поля
export const FieldSetContainer = ({children, className, ...props}) => <fieldset 
	{...props}
	className={clsx(styles.fieldset, className)}
>
	{children}
</fieldset>;

//можно реализовать и как компонент, и как рендер функцию
//зависит от того хотим мы видеть в дереве его или нет
export const renderLabel = ({children, label, key, className, ...props}) => <label 
	{...props}
	key={key}
	className={clsx(styles.field, className)}
>
	<span className={styles.label}>{label}</span>
	{children}
</label>;

export function Form({ 
	fields, 
	onSubmit, 
	formAction,
	Container = FormContainer, //кастомизация контейнера
	renderField = renderLabel, //кастомизация полей
	...props }) {

	//разные селекторы для разных по частоте изменения данных
	const formData = useSelector(selectFormData);
	//и возможно состояние понадобится кому-то еще
	const formState = useSelector(selectFormState);
	const dispatch = useDispatch();

	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (formAction) dispatch(submitForm(() => formAction(formData)));
		else if (onSubmit) onSubmit(formData, formState.result);
		return false;
	};

	useEffect(() => {
		//состояние формы изменилось, проверяем
		if (!formState.isLoading && formState.result) {
			if (onSubmit) onSubmit(formData, formState.result);
		}
	}, [formState]); //еще причина почему отделили от данных

	return <Container
		{...props}
		onSubmit={onSubmitHandler}
		submitDisabled={formState.isLoading}
		submitError={formState.error}
	>
		{fields.map(({label, input, name, className, ...inputProps}) => renderField({
			label,
			key: name,
			children: input ?? <Input 
				{...inputProps}
				name={name}
				className={clsx(styles.input, className)}
				value={formData[name]}
				onChange={value => {
					dispatch(setFormData({
						[name]: value
					}));
				}}
			/>
		}))}
	</Container>
}