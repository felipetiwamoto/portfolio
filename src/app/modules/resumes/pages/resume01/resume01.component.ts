import {Component} from '@angular/core'
import {Contact} from '../../interfaces/contact.interface'
import {Social} from '../../interfaces/social.interface'
import {Experience} from '../../interfaces/experience.interface'
import {Skill} from '../../interfaces/skill.interface'
import {AboutMe} from '../../interfaces/about-me.interface'
import {Education} from '../../interfaces/education.interface'
import {Language} from '../../interfaces/language.interface'

@Component({
	selector: 'app-resume01',
	templateUrl: './resume01.component.html',
	styleUrls: ['./resume01.component.scss'],
})
export class Resume01Component {
	public aboutMe: AboutMe = {
		text: `
			Sou programador com foco em ser desenvolvedor Full-Stack, atuando na área web há sete anos.
			Nas minhas experiências, tive o privilégio de trabalhar em empresas nas quais tive autonomia de buscar conhecimento e aplicar no dia a dia.
			Me esforcei para ser um profissional capaz de suprir as necessidades das empresas, nas quais aprendi com o proxímo e ensinei. Meu objetivo é aperfeiçoar os meus conhecimentos e buscar novas aprendizagens dentro da empresas, sempre com olhar na evolução pessoal e profissional.
		`,
	}
	public contacts: Contact[] = [
		{icon: 'ft_map_pin', text: 'Brasil - Curitiba/PR'},
		{icon: 'ft_mail', text: 'felipe.t.iwamoto@gmail.com'},
		{icon: 'ft_phone', text: '(11) 9.8455-6053'},
		{icon: 'ft_globe', text: 'https://felipetiwamoto.github.io/portfolio/'},
	]
	public skills: Skill[] = [
		{type: 'Frontend', label: 'HTML', level: 8},
		{type: 'Frontend', label: 'CSS', level: 9},
		{type: 'Frontend', label: 'JavaScript', level: 7},
		{type: 'Frontend', label: 'Jquery', level: 5},
		{type: 'Frontend', label: 'React/Redux', level: 5},
		{type: 'Frontend', label: 'Angular 2+', level: 7},
		{type: 'Frontend', label: 'UI Frameworks', level: 7},
		{type: 'Backend', label: 'PHP', level: 5},
		{type: 'Backend', label: 'Laravel', level: 5},
		{type: 'Backend', label: 'Symfony', level: 5},
		{type: 'Backend', label: 'NodeJS', level: 7},
		{type: 'Backend', label: 'SQL', level: 5},
		{type: 'Backend', label: 'SOLID', level: 6},
		{type: 'Backend', label: 'Design Pattern', level: 5},
	]
	public languages: Language[] = [
		{label: 'Português', level: 10},
		{label: 'Japonês', level: 4},
		{label: 'Inglês', level: 6},
	]
	public socials: Social[] = [
		{slug: 'linkedin', label: 'Linkedin', href: 'www.google.com'},
		{slug: 'facebook', label: 'Facebook', href: 'www.google.com'},
		{slug: 'instagram', label: 'Instagram', href: 'www.google.com'},
		{slug: 'github', label: 'Github', href: 'www.google.com'},
	]
	public experiences: Experience[] = [
		{
			company: 'Tagme',
			job: 'Sr. Full-Stack',
			tasks: [
				'Atuação como Sênior.',
				'Mentoriamento de novos colaboradores.',
				'Manutenção nos sistemas existentes.',
				'Criação de novas funcionalidades.',
				'Criação de projetos do zero.',
			],
			softSkills: [
				'Capacidade de persuasão;',
				'Proatividade;',
				'Capacidade de trabalhar sob pressão;',
				'Senso de liderança;',
				'Capacidade analítica.',
			],
			hardSkills: ['Cursos técnicos;'],
			period: {from: 'JUN 2021', to: 'AGO 2022'},
		},
		{
			company: 'Tuxon',
			job: 'Sr. Full-Stack',
			tasks: [
				'Manutenção nos sistemas existentes.',
				'Criação de novas funcionalidades.',
				'Criação de projetos do zero.',
			],
			softSkills: [
				'Capacidade de persuasão;',
				'Proatividade;',
				'Capacidade de trabalhar sob pressão;',
				'Capacidade analítica.',
			],
			hardSkills: ['Cursos técnicos;', 'habilidades ligadas à informática.'],
			period: {from: 'FEV 2020', to: 'NOV 2020'},
		},
		{
			company: '4You2 Idiomas',
			job: 'Sr. Full-Stack',
			tasks: [
				'Mentoriamento de novos colaboradores.',
				'Manutenção nos sistemas existentes.',
				'Criação de novas funcionalidades.',
				'Criação de projetos do zero.',
			],
			softSkills: [
				'Proatividade;',
				'Capacidade de trabalhar sob pressão;',
				'Senso de liderança;',
				'Capacidade analítica;',
			],
			hardSkills: ['Conhecimento em uma língua estrangeira;', 'Cursos técnicos;'],
			period: {from: 'ABR 2019', to: 'SET 2019'},
		},
		{
			company: 'SPRO IT Solutions',
			job: 'Sr. Full-Stack',
			tasks: [
				'Manutenção nos sistemas existentes.',
				'Criação de novas funcionalidades.',
				'Criação de projetos do zero.',
			],
			softSkills: ['Proatividade;', 'Capacidade de trabalhar sob pressão;', 'Capacidade analítica;'],
			hardSkills: ['Cursos técnicos;'],
			period: {from: 'SET 2018', to: 'ABR 2019'},
		},
		{
			company: 'DevMaker',
			job: 'Sr. Full-Stack',
			tasks: [
				'Manutenção nos sistemas existentes.',
				'Criação de novas funcionalidades.',
				'Criação de projetos do zero.',
			],
			softSkills: ['Proatividade;', 'Capacidade de trabalhar sob pressão;', 'Capacidade analítica;'],
			hardSkills: ['Cursos técnicos;'],
			period: {from: 'OUT 2017', to: 'SET 2018'},
		},
		{
			company: '01Tec',
			job: 'Sr. Full-Stack',
			tasks: ['Manutenção nos sistemas existentes.', 'Criação de novas funcionalidades.'],
			softSkills: ['Proatividade;', 'Capacidade analítica;'],
			hardSkills: ['Cursos técnicos;'],
			period: {from: 'ABR 2015', to: 'SET 2016'},
		},
		{
			company: 'Serviços comunitários',
			job: 'Sr. Full-Stack',
			tasks: [
				'Ensinar programação (Projeto Lovelace)',
				'Fazer palestras.',
				'Distribuir cobertores.',
				'Distribuir alimentos.',
				'Dar aula de música.',
				'Auxiliar na mudança das pessoas.',
				'Música e Teatro ao ar livre.',
			],
			period: {from: 'ABR 2015', to: 'SET 2016'},
		},
	]
	public educations: Education[] = [
		{university: 'Faculdade Opet', course: 'Jogos Digitais (Técnico)', period: '1 ano'},
		{university: 'Udemy', course: 'Desenvolvimento Web', period: '54h'},
		{university: 'Udemy', course: 'Programação Reactiva', period: '17h'},
		{university: 'Udemy', course: 'PHP/Laravel/Symfony', period: '115h'},
		{university: 'Udemy', course: 'Angular 2+', period: '29h'},
		{university: 'Udemy', course: 'React/Redux', period: '54h'},
		{university: 'Udemy', course: 'NodeJS', period: '15h'},
		{university: 'Udemy', course: 'Design Pattern', period: '29h'},
		{university: 'Udemy', course: 'SOLID', period: '5h'},
		{university: 'Udemy', course: 'Design de Interface', period: '77h'},
	]

	get getSkillsTypes() {
		return Array.from(new Set(this.skills.map((item) => item.type)))
	}

	getSkillsByType(type: string | undefined) {
		return this.skills.filter((item) => item.type === type)
	}
}
