import {Component} from '@angular/core'
import {AboutMe} from '../../interfaces/about-me.interface'
import {Contact} from '../../interfaces/contact.interface'
import {Skill} from '../../interfaces/skill.interface'
import {Language} from '../../interfaces/language.interface'
import {Social} from '../../interfaces/social.interface'
import {Experience} from '../../interfaces/experience.interface'
import {Education} from '../../interfaces/education.interface'

@Component({
	selector: 'app-resume03',
	templateUrl: './resume03.component.html',
	styleUrls: ['./resume03.component.scss'],
})
export class Resume03Component {
	public aboutMe: AboutMe = {
		text: `
				I'm a full-stack web developer with 7 years of experience.
				In my experiences i had the privilege to work in companies that gaves me opportunities to study and apply my knowledge.
				I work really hard to become a professional which was able to match to all the company's needs.
				My goal is to improve my knowledge and become a better professional.
			`,
	}
	public contacts: Contact[] = [
		{icon: 'ft_map_pin', text: 'Curitiba/PR'},
		{icon: 'ft_mail', text: 'rangeljanekelly@gmail.com'},
		{icon: 'ft_phone', text: '(41) 9.9896-1453'},
	]
	public skills: Skill[] = [
		{type: 'Informática', label: 'Excel', level: 4},
		{type: 'Informática', label: 'Word', level: 6},
		{type: 'Informática', label: 'Digitação', level: 8},
		{type: 'Informática', label: 'HTML/CSS', level: 2},
		{type: 'Profissional', label: 'Comunicação', level: 8},
		{type: 'Profissional', label: 'Liderança', level: 7},
		{type: 'Profissional', label: 'Trabalho em Equipe', level: 7},
		{type: 'Profissional', label: 'Organização de Tempo', level: 9},
	]
	public languages: Language[] = [
		{label: 'Português', level: 10},
		{label: 'Inglês', level: 2},
	]
	public socials: Social[] = [
		{
			slug: 'linkedin',
			label: 'Linkedin',
			href: 'https://www.linkedin.com/in/jane-kelly-rangel-rodrigues-iwamoto-22b836116/',
		},
		{
			slug: 'instagram',
			label: 'Instagram',
			href: 'https://www.instagram.com/_janerangel?igsh=MXBib3JxZzgydjAyZA==',
		},
	]
	public experiences: Experience[] = [
		{
			company: 'Lojacorr',
			job: 'Aux. Operações',
			tasks: [
				'Notificação de parcelas',
				'Auxilio a corretores',
				'Contato com cliente',
				'Negociação',
				'Resolução de chamados',
			],
			// softSkills: ['Negotiation;', 'Proactivity;', 'Work under pressure;', 'Leadership;', 'Analytic;'],
			// hardSkills: ['Tecnical course;'],
			period: {from: 'SET 2021', to: 'NOV 2023'},
		},
		{
			company: 'Mercado Bonfim',
			job: 'Operadora de Caixa',
			tasks: ['Atendimento ao cliente', 'Reposição de mercadorias', 'Fechamento de caixa'],
			// softSkills: ['Negotiation;', 'Proactivity;', 'Work under pressure;', 'Leadership;', 'Analytic;'],
			// hardSkills: ['Tecnical course;'],
			period: {from: 'SET 2018', to: 'DEZ 2020'},
		},
		{
			company: 'FACIAP',
			job: 'Recepcionista',
			tasks: [
				'Auxilio do setor de RH',
				'Auxilio do setor de Administrativo',
				'Controle de correspondência',
				'Atendimento telefônico',
			],
			// softSkills: ['Negotiation;', 'Proactivity;', 'Work under pressure;', 'Leadership;', 'Analytic;'],
			// hardSkills: ['Tecnical course;'],
			period: {from: 'ABR 2014', to: 'JUL 2017'},
		},
		{
			company: 'ASSEMP',
			job: 'Contínuo',
			tasks: ['Pagamentod de contas', 'Acerto de viagens', 'Organização de agendas', 'Atendimento telefônico'],
			// softSkills: ['Negotiation;', 'Proactivity;', 'Work under pressure;', 'Leadership;', 'Analytic;'],
			// hardSkills: ['Tecnical course;'],
			period: {from: 'JAN 2013', to: 'FEV 2014'},
		},
		{
			company: 'Serviços comunitários',
			job: 'Auxilio gerais',
			tasks: [
				'Fazer palestras.',
				'Distribuir cobertores.',
				'Distribuir alimentos.',
				'Visita à orfanatos.',
				'Teatro ao ar livre.',
			],
			period: {from: 'ABR 2013', to: 'ATUALMENTE'},
		},
	]
	public educations: Education[] = [
		{university: 'Uniandrade', course: 'Marketing', period: 'cursando'},
		{university: 'Unicesumar', course: 'Design de moda', period: '2 anos'},
	]
	get getSkillsTypes() {
		return Array.from(new Set(this.skills.map((item) => item.type)))
	}
	getSkillsByType(type: string | undefined) {
		return this.skills.filter((item) => item.type === type)
	}
}
