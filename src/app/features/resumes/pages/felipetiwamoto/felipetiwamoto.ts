import { Component } from '@angular/core';
import { Resume } from '../../interfaces/resume';
import { ResumeHero01 } from '../../components/resume-hero/resume-hero01/resume-hero01';
import { ResumeContacts01 } from '../../components/resume-contacts/resume-contacts01/resume-contacts01';
import { ResumeExperiences01 } from '../../components/resume-experiences/resume-experiences01/resume-experiences01';
import { ResumeAbout01 } from '../../components/resume-about/resume-about01/resume-about01';
import { ResumeSkills01 } from '../../components/resume-skills/resume-skills01/resume-skills01';
import { ResumeCourses01 } from '../../components/resume-courses/resume-courses01/resume-courses01';
import { LucideAngularModule } from 'lucide-angular';

@Component({
	selector: 'app-felipetiwamoto',
	imports: [
		ResumeHero01,
		ResumeContacts01,
		ResumeExperiences01,
		ResumeAbout01,
		ResumeSkills01,
		ResumeCourses01,
		LucideAngularModule,
	],
	templateUrl: './felipetiwamoto.html',
	styleUrl: './felipetiwamoto.scss',
})
export class FelipeTiwamoto {
	public localize = $localize;

	public hero: Resume['hero'] = {
		name: $localize`:@@felipetiwamoto_hero_name: Felipe Iwamoto`,
		role: $localize`:@@felipetiwamoto_hero_role: Desenvolvedor Full-Stack Sênior`,
	};
	public contacts: Resume['contact'] = [
		{ icon: 'map-pin', description: 'Brazil - Curitiba/PR' },
		{ icon: 'mail', description: 'felipe.t.iwamoto@gmail.com' },
		{ icon: 'phone', description: '(11) 9.8455-6053' },
		{ icon: 'external-link', description: `felipetiwamoto.github.io/cv/${this.localize.locale}` },
	];
	public about: Resume['about'] = {
		summary: $localize`:@@felipetiwamoto_: Desenvolvedor Full-Stack Sênior com 9+ anos de experiência, especializado em Frontend com Angular 2+ e ReactJS. Expertise na criação de Design Systems escaláveis, migração de legados, otimização de performance e implementação de testes automatizados. Sólidos conhecimentos em TypeScript, RxJS, Redux, Node.js e práticas de Clean Code/SOLID. Histórico comprovado de liderança técnica, mentoria de equipes e entrega de soluções complexas em ambientes ágeis.`,
	};
	public languages: Resume['skills'] = [
		{ name: $localize`:@@felipetiwamoto_languages_portuguese: Português`, level: 10 },
		{ name: $localize`:@@felipetiwamoto_languages_english: Inglês`, level: 6 },
		{ name: $localize`:@@felipetiwamoto_languages_japanese: Japonês`, level: 4 },
	];
	public courses: Resume['courses'] = [
		{
			institution: $localize`:@@felipetiwamoto_courses_opet: Faculdade Opet`,
			name: $localize`:@@felipetiwamoto_courses_games: Jogos Digitais (Técnico)`,
			timeSpent: $localize`:@@felipetiwamoto_courses_time_spent_1_year: 1 ano`,
		},
		{ institution: 'Udemy', name: 'Web Development', timeSpent: '54h' },
		{ institution: 'Udemy', name: 'Reactive programming', timeSpent: '17h' },
		{ institution: 'Udemy', name: 'PHP/Laravel/Symfony', timeSpent: '115h' },
		{ institution: 'Udemy', name: 'Angular 2+', timeSpent: '29h' },
		{ institution: 'Udemy', name: 'React/Redux', timeSpent: '54h' },
		{ institution: 'Udemy', name: 'NodeJS', timeSpent: '15h' },
		{ institution: 'Udemy', name: 'Design Pattern', timeSpent: '29h' },
		{ institution: 'Udemy', name: 'SOLID', timeSpent: '5h' },
		{ institution: 'Udemy', name: 'UI/UX Design', timeSpent: '77h' },
	];
	public frontend: Resume['skills'] = [
		{ name: 'Angular 2+ (v18)', level: 9 },
		{ name: 'ReactJS', level: 8 },
		{ name: 'JavaScript', level: 7 },
		{ name: 'TypeScript', level: 7 },
		{ name: 'RxJS', level: 7 },
		{ name: 'Redux', level: 6 },
		{ name: 'HTML5', level: 9 },
		{ name: 'CSS3 / SCSS', level: 9 },
		{ name: 'Jest', level: 5 },
		{ name: 'Docker / CI/CD', level: 5 },
	];
	public backend: Resume['skills'] = [
		{ name: 'PHP', level: 5 },
		{ name: 'Laravel', level: 5 },
		{ name: 'Symfony', level: 5 },
		{ name: 'NodeJS', level: 7 },
		{ name: 'SQL', level: 5 },
		{ name: 'SOLID', level: 6 },
		{ name: 'Design Pattern', level: 5 },
	];
	public experiences: Resume['experiences'] = [
		{
			company: 'Banco BS2',
			startedAt: $localize`:@@felipetiwamoto_experiences_bs2_started_at: SET 2022`,
			endedAt: $localize`:@@felipetiwamoto_experiences_current: ATUAL`,
			responsabilities: [
				$localize`:@@felipetiwamoto_experiences_bs2_arch: Arquitetura e desenvolvimento de Design System corporativo com Angular 18.`,
				$localize`:@@felipetiwamoto_experiences_bs2_migration: Liderança na migração de aplicações legadas (Angular 12 → 18).`,
				$localize`:@@felipetiwamoto_experiences_bs2_i18n: Implementação de internacionalização (i18n) e otimização de performance.`,
				$localize`:@@felipetiwamoto_experiences_bs2_mentoring: Mentoria técnica e Code Reviews focados em Clean Code e SOLID.`,
			],
			softSkills: [
				$localize`:@@felipetiwamoto_experiences_leadership: Liderança Técnica;`,
				$localize`:@@felipetiwamoto_experiences_problem_solving: Resolução de Problemas;`,
				$localize`:@@felipetiwamoto_experiences_communication: Comunicação Eficaz;`,
			],
			hardSkills: [$localize`:@@felipetiwamoto_experiences_courses: Cursos técnicos;`],
			description: $localize`:@@felipetiwamoto_experiences_description_senior_developer: Como Desenvolvedor Sênior, liderei a arquitetura do Frontend, criando um Design System robusto (componentes, diretivas, pipes) que padronizou múltiplos produtos do banco. Executei migrações complexas de versão do Angular, garantindo zero downtime. Implementei estratégias de i18n para suporte global (PT/EN/ZH) e promovi a cultura de qualidade de código através de mentorias e workshops internos.`,
		},
		{
			company: 'Tagme',
			startedAt: $localize`:@@felipetiwamoto_experiences_tagme_started_at: JUN 2021  `,
			endedAt: $localize`:@@felipetiwamoto_experiences_tagme_ended_at: AGO 2022`,
			responsabilities: [
				$localize`:@@felipetiwamoto_experiences_tagme_lead: Liderança técnica de Frontend em novos projetos (Greenfield).`,
				$localize`:@@felipetiwamoto_experiences_tagme_arch: Definição de arquitetura escalável e escolhas tecnológicas.`,
				$localize`:@@felipetiwamoto_experiences_tagme_mentoring: Onboarding e capacitação técnica do time de desenvolvimento.`,
			],
			softSkills: [
				$localize`:@@felipetiwamoto_experiences_leadership: Gestão de Equipe;`,
				$localize`:@@felipetiwamoto_experiences_proactivity: Proatividade;`,
			],
			hardSkills: [$localize`:@@felipetiwamoto_experiences_courses: Cursos técnicos;`],
			description: $localize`:@@felipetiwamoto_experiences_description_team_lead: Atuei como Tech Lead de Frontend, responsável pela concepção e desenvolvimento de novos produtos do zero. Defini a stack tecnológica e padrões de arquitetura, garantindo escalabilidade e manutenibilidade. Conduzi o time através de desafios técnicos, implementando boas práticas de desenvolvimento e realizando workshops para nivelamento técnico da equipe.`,
		},
		{
			company: 'Bitknot',
			startedAt: $localize`:@@felipetiwamoto_experiences_bitknot_started_at: JAN 2021`,
			endedAt: $localize`:@@felipetiwamoto_experiences_bitknot_ended_at: ABR 2021`,
			responsabilities: [
				$localize`:@@felipetiwamoto_experiences_bitknot_dev: Desenvolvimento Full-Stack em ambiente internacional (Japão).`,
				$localize`:@@felipetiwamoto_experiences_bitknot_legacy: Modernização de sistemas legados e criação de Landing Pages.`,
			],
			softSkills: [
				$localize`:@@felipetiwamoto_experiences_adaptability: Adaptabilidade Cultural;`,
				$localize`:@@felipetiwamoto_experiences_remote: Trabalho Remoto Global;`,
			],
			description: $localize`:@@felipetiwamoto_experiences_bitknot_description_team_lead: Atuação em time multicultural japonês, desenvolvendo soluções web com foco em alta fidelidade de design e performance. Responsável pela manutenção de sistemas críticos e entrega de novas features, seguindo rigorosos padrões de qualidade e prazos.`,
		},
		{
			company: 'Tuxon',
			startedAt: $localize`:@@felipetiwamoto_experiences_tuxon_started_at: FEV 2020`,
			endedAt: $localize`:@@felipetiwamoto_experiences_tuxon_ended_at: NOV 2020`,
			responsabilities: [
				$localize`:@@felipetiwamoto_experiences_maintenance: Manutenção nos sistemas existentes.`,
				$localize`:@@felipetiwamoto_experiences_creation: Criação de novas funcionalidades.`,
				$localize`:@@felipetiwamoto_experiences_creation_scratch: Criação de projetos do zero.`,
			],
			softSkills: [
				$localize`:@@felipetiwamoto_experiences_persuasion: Capacidade de persuasão;`,
				$localize`:@@felipetiwamoto_experiences_proactivity: Proatividade;`,
				$localize`:@@felipetiwamoto_experiences_pressure: Capacidade de trabalhar sob pressão;`,
				$localize`:@@felipetiwamoto_experiences_analytical: Capacidade analítica.`,
			],
			hardSkills: [
				$localize`:@@felipetiwamoto_experiences_courses: Cursos técnicos;`,
				$localize`:@@felipetiwamoto_experiences_computer_science: habilidades ligadas à informática.`,
			],
			description: $localize`:@@felipetiwamoto_experiences_description_tuxon: Atuação na manutenção de sistemas existentes, desenvolvimento de novas funcionalidades e criação de projetos do zero. Perfil proativo, com forte capacidade analítica, habilidade para trabalhar sob pressão e boa comunicação para alinhamento técnico com o time.`,
		},
		{
			company: 'Interlink',
			startedAt: $localize`:@@felipetiwamoto_experiences_interlink_started_at: OUT 2019`,
			endedAt: $localize`:@@felipetiwamoto_experiences_interlink_ended_at: FEV 2020`,
			responsabilities: [
				$localize`:@@felipetiwamoto_experiences_interlink_redux: Implementação de arquitetura de estado com Redux do zero.`,
				$localize`:@@felipetiwamoto_experiences_interlink_fullstack: Desenvolvimento Full-Stack (ReactJS + Node.js) para mercado americano.`,
			],
			softSkills: [
				$localize`:@@felipetiwamoto_experiences_english: Inglês Fluente;`,
				$localize`:@@felipetiwamoto_experiences_autonomy: Autonomia;`,
			],
			description: $localize`:@@felipetiwamoto_experiences_description_interlink: Desenvolvedor Full-Stack em projeto internacional (EUA). Projetei e implementei toda a camada de gerenciamento de estado com Redux, resolvendo problemas complexos de fluxo de dados. Atuei tanto no Frontend (React) quanto no Backend, garantindo a integridade e escalabilidade da aplicação.`,
		},
		{
			company: '4You2 Idiomas',
			startedAt: $localize`:@@felipetiwamoto_experiences_4you2_started_at: ABR 2019`,
			endedAt: $localize`:@@felipetiwamoto_experiences_4you2_ended_at: SET 2019`,
			responsabilities: [
				$localize`:@@felipetiwamoto_experiences_mentoring: Mentoriamento de novos colaboradores.`,
				$localize`:@@felipetiwamoto_experiences_maintenance: Manutenção nos sistemas existentes.`,
				$localize`:@@felipetiwamoto_experiences_creation: Criação de novas funcionalidades.`,
				$localize`:@@felipetiwamoto_experiences_creation_scratch: Criação de projetos do zero.`,
			],
			softSkills: [
				$localize`:@@felipetiwamoto_experiences_proactivity: Proatividade;`,
				$localize`:@@felipetiwamoto_experiences_pressure: Capacidade de trabalhar sob pressão;`,
				$localize`:@@felipetiwamoto_experiences_leadership: Senso de liderança;`,
				$localize`:@@felipetiwamoto_experiences_analytical: Capacidade analítica;`,
			],
			hardSkills: [
				$localize`:@@felipetiwamoto_experiences_foreign_language: Conhecimento em uma língua estrangeira;`,
				$localize`:@@felipetiwamoto_experiences_courses: Cursos técnicos;`,
			],
			description: $localize`:@@felipetiwamoto_experiences_description_4you2: Atuação na manutenção e evolução de sistemas existentes, desenvolvimento de novas funcionalidades e criação de projetos do zero. Forte experiência com inglês no dia a dia, participando de dailies e alinhamentos técnicos com falantes nativos, entendendo demandas diretamente com o time internacional e realizando implementações e ajustes contínuos. Atuação ativa no mentoriamento de novos colaboradores, apoiando onboarding, direcionamento técnico e evolução profissional, com perfil proativo, analítico e senso de liderança.`,
		},
		{
			company: 'SPRO IT Solutions',
			startedAt: $localize`:@@felipetiwamoto_experiences_spro_started_at: SET 2018`,
			endedAt: $localize`:@@felipetiwamoto_experiences_spro_ended_at: ABR 2019`,
			responsabilities: [
				$localize`:@@felipetiwamoto_experiences_maintenance: Manutenção nos sistemas existentes.`,
				$localize`:@@felipetiwamoto_experiences_creation: Criação de novas funcionalidades.`,
				$localize`:@@felipetiwamoto_experiences_creation_scratch: Criação de projetos do zero.`,
			],
			softSkills: [
				$localize`:@@felipetiwamoto_experiences_proactivity: Proatividade;`,
				$localize`:@@felipetiwamoto_experiences_pressure: Capacidade de trabalhar sob pressão;`,
				$localize`:@@felipetiwamoto_experiences_analytical: Capacidade analítica;`,
			],
			hardSkills: [$localize`:@@felipetiwamoto_experiences_courses: Cursos técnicos;`],
			description: $localize`:@@felipetiwamoto_experiences_description_spro: Atuação na manutenção de sistemas existentes, desenvolvimento de novas funcionalidades e criação de projetos do zero, com forte foco em automação de processos. Mapeamento e entendimento de tarefas manuais que levavam dias ou semanas para serem executadas, criando automações que passaram a realizar esses processos em segundos, acelerando significativamente o fluxo de trabalho e apoiando diretamente outras áreas da empresa.`,
		},
		{
			company: 'DevMaker',
			startedAt: $localize`:@@felipetiwamoto_experiences_devmaker_started_at: OUT 2017`,
			endedAt: $localize`:@@felipetiwamoto_experiences_devmaker_ended_at: SET 2018`,
			responsabilities: [
				$localize`:@@felipetiwamoto_experiences_maintenance: Manutenção nos sistemas existentes.`,
				$localize`:@@felipetiwamoto_experiences_creation: Criação de novas funcionalidades.`,
				$localize`:@@felipetiwamoto_experiences_creation_scratch: Criação de projetos do zero.`,
			],
			softSkills: [
				$localize`:@@felipetiwamoto_experiences_proactivity: Proatividade;`,
				$localize`:@@felipetiwamoto_experiences_pressure: Capacidade de trabalhar sob pressão;`,
				$localize`:@@felipetiwamoto_experiences_analytical: Capacidade analítica;`,
			],
			hardSkills: [$localize`:@@felipetiwamoto_experiences_courses: Cursos técnicos;`],
			description: $localize`:@@felipetiwamoto_experiences_description_devmaker: Apesar da posição júnior, identifiquei a alta demanda de projetos e a dificuldade do time em manter o ritmo de entregas. Em alinhamento com o time de design, liderei a padronização dos componentes da empresa, criando variações reutilizáveis aplicadas em todos os novos projetos. Para viabilizar essa iniciativa, estudei profundamente frameworks como Bootstrap, Material e Semantic UI, desenvolvendo uma solução adaptada às necessidades da empresa, o que contribuiu para redução de horas extras e trabalho aos fins de semana.`,
		},
		{
			company: '01Tec',
			startedAt: $localize`:@@felipetiwamoto_experiences_01tec_started_at: ABR 2015`,
			endedAt: $localize`:@@felipetiwamoto_experiences_01tec_ended_at: SET 2016`,
			responsabilities: [
				$localize`:@@felipetiwamoto_experiences_maintenance: Manutenção nos sistemas existentes.`,
				$localize`:@@felipetiwamoto_experiences_creation_scratch: Criação de projetos do zero.`,
			],
			softSkills: [
				$localize`:@@felipetiwamoto_experiences_proactivity: Proatividade;`,
				$localize`:@@felipetiwamoto_experiences_analytical: Capacidade analítica;`,
			],
			hardSkills: [$localize`:@@felipetiwamoto_experiences_courses: Cursos técnicos;`],
			description: $localize`:@@felipetiwamoto_experiences_description_01tec: Experiência de estágio onde iniciei com conhecimentos básicos em lógica de programação e evoluí para o desenvolvimento web completo, aprendendo HTML, CSS, JavaScript, jQuery, PHP e MySQL, além da criação de temas para WordPress. Após o período de estágio, atuei como freelancer para a empresa por alguns meses, contribuindo em projetos adicionais.`,
		},
		{
			company: $localize`:@@felipetiwamoto_experiences_community_company: Serviços comunitários`,
			startedAt: $localize`:@@felipetiwamoto_experiences_community_started_at: ABR 2015`,
			endedAt: $localize`:@@felipetiwamoto_experiences_community_ended_at: SET 2016`,
			responsabilities: [
				$localize`:@@felipetiwamoto_experiences_community_teaching_programming: Ensinar programação (Projeto Lovelace)`,
				$localize`:@@felipetiwamoto_experiences_community_do_lectures: Fazer palestras.`,
				$localize`:@@felipetiwamoto_experiences_community_distribute_blankets: Distribuir cobertores.`,
				$localize`:@@felipetiwamoto_experiences_community_distribute_food: Distribuir alimentos.`,
				$localize`:@@felipetiwamoto_experiences_community_do_music_lessons: Dar aula de música.`,
				$localize`:@@felipetiwamoto_experiences_community_help_move_people: Auxiliar na mudança das pessoas.`,
				$localize`:@@felipetiwamoto_experiences_community_outdoor_music_theater: Música e Teatro ao ar livre.`,
			],
			description: $localize`:@@felipetiwamoto_experiences_description_community: Atuação em iniciativas comunitárias, incluindo ensino de programação, realização de palestras educativas, distribuição de cobertores e alimentos para pessoas em situação de vulnerabilidade, aulas de música, apoio em mudanças residenciais e participação em apresentações de música e teatro ao ar livre, contribuindo para educação, cultura e apoio social.`,
		},
	];
}
