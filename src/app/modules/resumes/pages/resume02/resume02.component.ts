import {Component} from '@angular/core'
import {Contact} from '../../interfaces/contact.interface'
import {Social} from '../../interfaces/social.interface'
import {Experience} from '../../interfaces/experience.interface'
import {Skill} from '../../interfaces/skill.interface'
import {AboutMe} from '../../interfaces/about-me.interface'
import {Education} from '../../interfaces/education.interface'
import {Language} from '../../interfaces/language.interface'

@Component({
	selector: 'app-resume02',
	templateUrl: './resume02.component.html',
	styleUrls: ['./resume02.component.scss'],
})
export class Resume02Component {
	public aboutMe: AboutMe = {
		text: `
			I'm a full-stack web developer with 7 years of experience.
			In my experiences i had the privilege to work in companies that gaves me opportunities to study and apply my knowledge.
			I work really hard to become a professional which was able to match to all the company's needs.
			My goal is to improve my knowledge and become a better professional.
		`,
	}
	public contacts: Contact[] = [
		{icon: 'ft_map_pin', text: 'Brazil - Curitiba/PR'},
		{icon: 'ft_mail', text: 'felipe.t.iwamoto@gmail.com'},
		{icon: 'ft_phone', text: '+55 (11) 9.8455-6053'},
		{
			icon: 'ft_globe',
			text: 'felipetiwamoto.github.io/portfolio/',
			href: 'https://felipetiwamoto.github.io/portfolio/',
		},
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
		{label: 'Portuguese', level: 10},
		{label: 'Japanese', level: 4},
		{label: 'English', level: 6},
	]
	public socials: Social[] = [
		{slug: 'linkedin', label: 'Linkedin', href: 'www.google.com'},
		{slug: 'facebook', label: 'Facebook', href: 'www.google.com'},
		{slug: 'instagram', label: 'Instagram', href: 'www.google.com'},
		{slug: 'github', label: 'Github', href: 'www.google.com'},
	]
	public experiences: Experience[] = [
		{
			company: 'Banco BS2',
			job: 'Sr. Full-Stack',
			tasks: ['Senior role', 'Mentoring interns', 'Maintenance current system', 'Add new features.'],
			softSkills: ['Negotiation;', 'Proactivity;', 'Work under pressure;', 'Leadership;', 'Analytic;'],
			hardSkills: ['Tecnical course;'],
			period: {from: 'APR 2023', to: 'CURRENT'},
		},
		{
			company: 'Tagme',
			job: 'Sr. Full-Stack',
			tasks: [
				'Senior role',
				'Mentoring interns',
				'Maintenance current system',
				'Add new features.',
				'Create systems from scratch.',
			],
			softSkills: ['Negotiation;', 'Proactivity;', 'Work under pressure;', 'Leadership;', 'Analytic;'],
			hardSkills: ['Tecnical course;'],
			period: {from: 'JUN 2021', to: 'AUG 2022'},
		},
		{
			company: 'Tuxon',
			job: 'Sr. Full-Stack',
			tasks: ['Maintenance current system', 'Add new features.', 'Create systems from scratch.'],
			softSkills: ['Negotiation;', 'Proactivity;', 'Work under pressure;', 'Analytic;'],
			hardSkills: ['Tecnical course;', 'IT skills.'],
			period: {from: 'FEB 2020', to: 'NOV 2020'},
		},
		{
			company: '4You2 Idiomas',
			job: 'Sr. Full-Stack',
			tasks: [
				'Mentoring interns',
				'Maintenance current system',
				'Add new features.',
				'Create systems from scratch.',
			],
			softSkills: ['Proactivity;', 'Work under pressure;', 'Leadership;', 'Analytic;'],
			hardSkills: ['Use a foreign language;', 'Tecnical course;'],
			period: {from: 'APR 2019', to: 'SEP 2019'},
		},
		{
			company: 'SPRO IT Solutions',
			job: 'Sr. Full-Stack',
			tasks: ['Maintenance current system', 'Add new features.', 'Create systems from scratch.'],
			softSkills: ['Proactivity;', 'Work under pressure;', 'Analytic;'],
			hardSkills: ['Tecnical course;'],
			period: {from: 'SEP 2018', to: 'APR 2019'},
		},
		{
			company: 'DevMaker',
			job: 'Sr. Full-Stack',
			tasks: ['Maintenance current system', 'Add new features.', 'Create systems from scratch.'],
			softSkills: ['Proactivity;', 'Work under pressure;', 'Analytic;'],
			hardSkills: ['Tecnical course;'],
			period: {from: 'OCT 2017', to: 'SEP 2018'},
		},
		{
			company: '01Tec',
			job: 'Sr. Full-Stack',
			tasks: ['Maintenance current system', 'Add new features.'],
			softSkills: ['Proactivity;', 'Analytic;'],
			hardSkills: ['Tecnical course;'],
			period: {from: 'APR 2015', to: 'SEP 2016'},
		},
		{
			company: 'Community service',
			job: 'Sr. Full-Stack',
			tasks: [
				'Teaching programming (Lovelace Project)',
				'Programming speeches.',
				'Delivery blankets to the homeless.',
				'Deliver food to the homeless.',
				'Teaching music.',
				'Help people moving out.',
				'Public music and theater.',
			],
			period: {from: 'APR 2015', to: 'SEP 2016'},
		},
	]
	public educations: Education[] = [
		{university: 'Opet University', course: 'Digital game (Tecnical)', period: '1y'},
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
