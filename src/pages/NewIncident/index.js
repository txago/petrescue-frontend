import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.scss';

export default function Login() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const history = useHistory();

	const rescuerId = localStorage.getItem('rescuerId');
	const rescuerName = localStorage.getItem('rescuerName');

	async function handleNewIncident(evt) {
		evt.preventDefault();

		const data = {
			title,
			description
		};

		try {
			await api.post('incidents', data, {
				headers: {
					Authorization: rescuerId
				}
			});
			history.push('/profile');
		} catch (err) {
			alert('Erro na criação de pet, tente novamente.');
		}
	}

	function handleLogout() {
		localStorage.clear();
		history.push('/');
	}

	return (
		<>
			<nav className='navbar navbar-expand-lg bg-purple navbar-dark'>
				<Link to={'/profile'} className='navbar-brand pt-0 mb-0 h1 profile'>
					Pet<span className='text-info'>Rescue</span>
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarToggler'
					aria-controls='navbarToggler'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className='collapse navbar-collapse' id='navbarToggler'>
					<p className='navbar-nav ml-auto mr-auto my-sm-2 mt-2 my-lg-0 text-white'>
						Olá, {rescuerName}
					</p>
					<Link
						to={'/incidents/new'}
						className='btn btn-secondary my-2 my-sm-0 mr-2'>
						Cadastrar novo pet
					</Link>
					<button
						onClick={handleLogout}
						type='button'
						className='btn btn-outline-info my-2 my-sm-0'>
						Sair
					</button>
				</div>
			</nav>
			<div className='incident-bg pb-4'>
				<div className='container'>
					<div className='row align-items-center justify-content-center'>
						<div className='col-sm-12 col-md-10 col-lg-8 col-xl-6'>
							<h1 className='incident-title my-4'>Cadastrar novo pet</h1>
							<p className='lead'>
								Conte um pouco mais sobre o pet que você quer disponibilizar
								para adoção.
							</p>
							<form onSubmit={handleNewIncident} className='mb-4'>
								<div className='form-row'>
									<div className='form-group col-12'>
										<label
											htmlFor='inputTitle'
											className='col-form-label col-form-label'>
											Título
										</label>
										<input
											type='text'
											className='form-control form-control'
											id='inputTitle'
											placeholder='Ex.: Gato preto, cerca de 1 ano, brincalhão'
											aria-describedby='titleHelp'
											value={title}
											onChange={evt => setTitle(evt.target.value)}
										/>
										<small id='titleHelp' className='text-muted'>
											Use um título pequeno e claro, ex.: "Cachorro SRD, pequeno
											porte, para adoção"
										</small>
									</div>
								</div>
								<div className='form-row'>
									<div className='form-group col-12'>
										<label
											htmlFor='textareaDescription'
											className='col-form-label col-form-label'>
											Descrição
										</label>
										<textarea
											type='text'
											className='form-control form-control'
											id='textareaDescription'
											rows='3'
											placeholder='Ex.: Gatinho preto, encontrado na rua de trás da minha casa. Tem por volta de 1 ano, é extremamente brincalhão e carinhoso...'
											aria-describedby='descriptionHelp'
											value={description}
											onChange={evt => setDescription(evt.target.value)}
										/>
										<small id='descriptionHelp' className='text-muted'>
											Conte de forma breve como encontrou o pet, qual são as
											características, por exemplo cor, tamanho, idade média, ou
											se tem alguma necessidade especial.
										</small>
									</div>
								</div>
								<button
									type='submit'
									className='btn btn-secondary btn-lg mt-2 mb-4'>
									Cadastrar
								</button>
							</form>
							<Link to='/profile'>
								<button type='button' className='btn btn-light mb-4'>
									<span role='img' aria-label='Voltar para o login'>
										🐱
									</span>{' '}
									Voltar para o login
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
