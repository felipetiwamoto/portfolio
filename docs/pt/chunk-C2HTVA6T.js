import {
	$a as z,
	Aa as p,
	Ba as r,
	Ca as l,
	Da as _,
	Ea as M,
	Fa as E,
	Ga as I,
	Ha as Q,
	J as q,
	Ja as S,
	Ka as f,
	La as i,
	Ma as m,
	Na as d,
	Oa as V,
	Pa as C,
	Qa as b,
	Ra as x,
	Sa as Y,
	Ta as t,
	Ua as k,
	Wa as K,
	Xa as v,
	ab as T,
	ga as J,
	ha as e,
	pa as u,
	va as L,
	wa as F,
	xa as P,
	ya as h,
	za as w,
} from './chunk-VEQDTPWR.js';
function ee(s, c) {
	if ((s & 1 && (M(0, 'div'), I(1, 'img', 1), E()), s & 2)) {
		let o,
			n,
			a = f(),
			g = x(0);
		(i(t('', g, '__left')),
			e(),
			i(t('', g, '__image')),
			Q('alt', Y((o = a.hero()) == null ? null : o.name))('src', (n = a.hero()) == null ? null : n.image, J));
	}
}
var U = class s {
	hero = v();
	static ɵfac = function (o) {
		return new (o || s)();
	};
	static ɵcmp = u({
		type: s,
		selectors: [['resume-hero01']],
		inputs: { hero: [1, 'hero'] },
		decls: 9,
		vars: 18,
		consts: [
			[3, 'class'],
			[3, 'src', 'alt'],
		],
		template: function (o, n) {
			if (
				(o & 1 &&
					(C(0),
					M(1, 'div'),
					L(2, ee, 2, 9, 'div', 0),
					I(3, 'div'),
					M(4, 'div')(5, 'span'),
					m(6),
					E(),
					M(7, 'span'),
					m(8),
					E()()()),
				o & 2)
			) {
				let a,
					g,
					R,
					y = b('resume_hero01');
				(e(),
					i(y),
					e(),
					F((a = n.hero()) != null && a.image ? 2 : -1),
					e(),
					i(t('', y, '__left')),
					e(),
					i(t('', y, '__right')),
					e(),
					i(t('', y, '__name')),
					e(),
					d((g = n.hero()) == null ? null : g.name),
					e(),
					i(t('', y, '__role')),
					e(),
					d((R = n.hero()) == null ? null : R.role));
			}
		},
		styles: [
			'.resume_hero01[_ngcontent-%COMP%]{text-align:center}@media all and (min-width:768px){.resume_hero01[_ngcontent-%COMP%]{text-align:left}}.resume_hero01__name[_ngcontent-%COMP%]{font-size:clamp(20px,5vw,48px);font-weight:700;letter-spacing:initial;line-height:initial;color:var(--resume01_primary);display:block}.resume_hero01__role[_ngcontent-%COMP%]{font-size:clamp(14px,3vw,18px);font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);display:block}',
		],
	});
};
function ie(s, c) {
	if ((s & 1 && (r(0, 'li'), _(1, 'i-lucide', 1), r(2, 'span'), m(3), l()()), s & 2)) {
		let o = c.$implicit;
		f();
		let n = x(0);
		(i(t('', n, '__list_item')),
			e(),
			i(t('', n, '__list_icon')),
			p('name', o.icon)('size', 16)('strokeWidth', 2),
			e(),
			i(t('', n, '__list_name')),
			e(),
			d(o.description));
	}
}
var W = class s {
	contacts = v();
	static ɵfac = function (o) {
		return new (o || s)();
	};
	static ɵcmp = u({
		type: s,
		selectors: [['resume-contacts01']],
		inputs: { contacts: [1, 'contacts'] },
		decls: 5,
		vars: 6,
		consts: [
			[3, 'class'],
			[3, 'name', 'size', 'strokeWidth'],
		],
		template: function (o, n) {
			if ((o & 1 && (C(0), r(1, 'div')(2, 'ul'), h(3, ie, 4, 13, 'li', 0, P), l()()), o & 2)) {
				let a = b('resume_contacts01');
				(e(), i(a), e(), i(t('', a, '__list')), e(), w(n.contacts()));
			}
		},
		dependencies: [T, z],
		styles: [
			'.resume_contacts01__list_item[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex-direction:initial;margin-bottom:15px}@media all and (min-width:768px){.resume_contacts01__list_item[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:initial;flex-direction:initial}}.resume_contacts01__list_name[_ngcontent-%COMP%]{font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);display:block;margin-top:0}.resume_contacts01[_ngcontent-%COMP%]     .resume_contacts01__list_icon{stroke:var(--resume01_primary);margin-right:5px}',
		],
	});
};
function te(s, c) {
	if ((s & 1 && (r(0, 'span'), m(1), l()), s & 2)) {
		let o = f().$implicit;
		f();
		let n = x(0);
		(i(t('', n, '__item_description')), e(), d(o.description));
	}
}
function ae(s, c) {
	if (
		(s & 1 &&
			(r(0, 'div')(1, 'div')(2, 'div'),
			_(3, 'i-lucide', 1),
			m(4),
			l(),
			r(5, 'div')(6, 'span'),
			m(7),
			l(),
			r(8, 'span'),
			m(9),
			l(),
			_(10, 'i-lucide', 2),
			l()(),
			r(11, 'div'),
			L(12, te, 2, 4, 'span', 0),
			l()()),
		s & 2)
	) {
		let o = c.$implicit;
		f();
		let n = x(0);
		(i(t('', n, '__item')),
			e(),
			i(t('', n, '__item_top')),
			e(),
			i(t('', n, '__item_company')),
			e(),
			i(t('', n, '__item_company_icon')),
			p('size', 18)('strokeWidth', 2),
			e(),
			V(' ', o.company, ' '),
			e(),
			i(t('', n, '__item_period')),
			e(),
			i(t('', n, '__item_from')),
			e(),
			d(o.startedAt),
			e(),
			i(t('', n, '__item_to')),
			e(),
			d(o.endedAt ?? 'ATUAL'),
			e(),
			i(t('', n, '__item_period_icon')),
			p('size', 14)('strokeWidth', 2),
			e(),
			i(t('', n, '__item_bottom')),
			e(),
			F(o.description ? 12 : -1));
	}
}
var N = class s {
	experiences = v();
	static ɵfac = function (o) {
		return new (o || s)();
	};
	static ɵcmp = u({
		type: s,
		selectors: [['resume-experiences01']],
		inputs: { experiences: [1, 'experiences'] },
		decls: 4,
		vars: 4,
		consts: [
			[3, 'class'],
			['name', 'chevron-right', 3, 'size', 'strokeWidth'],
			['name', 'calendar', 3, 'size', 'strokeWidth'],
		],
		template: function (o, n) {
			if ((o & 1 && (C(0), r(1, 'div'), h(2, ae, 13, 35, 'div', 0, P), l()), o & 2)) {
				let a = b('resume_experiences01');
				(e(), i(t('', a, '__item')), e(), w(n.experiences()));
			}
		},
		dependencies: [T, z],
		styles: [
			'.resume_experiences01__item[_ngcontent-%COMP%]{margin-bottom:30px}.resume_experiences01__item_job[_ngcontent-%COMP%]{display:none;margin-bottom:15px;font-size:14px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey7)}.resume_experiences01__item_top[_ngcontent-%COMP%]{margin-bottom:15px;display:flex;align-items:center;justify-content:space-between;flex-direction:initial}.resume_experiences01__item_company[_ngcontent-%COMP%]{font-size:14px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey7);display:flex;align-items:center;justify-content:initial;flex-direction:initial}.resume_experiences01__item_company[_ngcontent-%COMP%]   i-lucide[_ngcontent-%COMP%]{color:var(--resume01_primary);margin-right:5px}.resume_experiences01__item_period[_ngcontent-%COMP%]{align-items:baseline;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;display:flex;align-items:center;justify-content:initial;flex-direction:initial;color:var(--grey7)}.resume_experiences01__item_period[_ngcontent-%COMP%]   i-lucide[_ngcontent-%COMP%]{color:var(--resume01_primary);margin-left:5px}.resume_experiences01__item_from[_ngcontent-%COMP%]{text-transform:capitalize}.resume_experiences01__item_from[_ngcontent-%COMP%]:after{content:"-";display:inline-flex;margin-inline:5px}.resume_experiences01__item_to[_ngcontent-%COMP%], .resume_experiences01__item_is_current[_ngcontent-%COMP%]{text-transform:capitalize}.resume_experiences01__item_description[_ngcontent-%COMP%]{font-size:14px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7)}.resume_experiences01__item_list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-15px}.resume_experiences01__item_list[_ngcontent-%COMP%] + .resume_experiences01__item_list[_ngcontent-%COMP%]{margin-top:10px}.resume_experiences01__item_list_title[_ngcontent-%COMP%]{margin-block:15px;font-size:12px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey7);display:flex;align-items:center;justify-content:initial;flex-direction:initial}.resume_experiences01__item_list_title[_ngcontent-%COMP%]   i-lucide[_ngcontent-%COMP%]{color:var(--resume01_primary)}.resume_experiences01__item_list_item[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:initial;flex-direction:initial;box-sizing:border-box;max-width:50%;flex-basis:50%;padding-inline:15px;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);margin-bottom:5px}',
		],
	});
};
var D = class s {
	about = v();
	static ɵfac = function (o) {
		return new (o || s)();
	};
	static ɵcmp = u({
		type: s,
		selectors: [['resume-about01']],
		inputs: { about: [1, 'about'] },
		decls: 3,
		vars: 6,
		template: function (o, n) {
			if ((o & 1 && (M(0, 'div')(1, 'span'), m(2), E()()), o & 2)) {
				let a,
					g = 'resume_about01';
				(i(g), e(), i(t('', g, '__summary')), e(), d((a = n.about()) == null ? null : a.summary));
			}
		},
		styles: [
			'.resume_about01__summary[_ngcontent-%COMP%]{font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);display:block}',
		],
	});
};
function ne(s, c) {
	if ((s & 1 && I(0, 'li'), s & 2)) {
		let o = c.$index,
			n = f().$implicit,
			a = f(),
			g = x(0);
		i(k('', g, '__bullet_item ', a.isBulletItemActive(n, o + 1)));
	}
}
function oe(s, c) {
	if ((s & 1 && (M(0, 'li')(1, 'span'), m(2), E(), M(3, 'ul'), h(4, ne, 1, 4, 'li', 0, P), E()()), s & 2)) {
		let o = c.$implicit,
			n = f(),
			a = x(0);
		(i(t('', a, '__list_item')),
			e(),
			i(t('', a, '__list_name')),
			e(),
			d(o.name),
			e(),
			i(t('', a, '__bullet')),
			e(),
			w(n.levels));
	}
}
var G = class s {
	skills = v();
	levels = Array(10).fill(0);
	isBulletItemActive(c, o) {
		return c?.level && c.level >= o ? 'active' : '';
	}
	static ɵfac = function (o) {
		return new (o || s)();
	};
	static ɵcmp = u({
		type: s,
		selectors: [['resume-skills01']],
		inputs: { skills: [1, 'skills'] },
		decls: 5,
		vars: 6,
		consts: [[3, 'class']],
		template: function (o, n) {
			if ((o & 1 && (C(0), M(1, 'div')(2, 'ul'), h(3, oe, 6, 10, 'li', 0, P), E()()), o & 2)) {
				let a = b('resume_skills01');
				(e(), i(a), e(), i(t('', a, '__list')), e(), w(n.skills()));
			}
		},
		styles: [
			'.resume_skills01__list[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.resume_skills01__list_name[_ngcontent-%COMP%]{font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);display:block}.resume_skills01__bullet[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(10,auto);margin-top:2.5px}.resume_skills01__bullet_item[_ngcontent-%COMP%]{width:6px;height:6px;border-radius:50px;background-color:var(--greyd)}.resume_skills01__bullet_item[_ngcontent-%COMP%] + .resume_skills01__bullet_item[_ngcontent-%COMP%]{margin-left:2.5px}.resume_skills01__bullet_item.active[_ngcontent-%COMP%]{background-color:var(--resume01_primary)}',
		],
	});
};
function se(s, c) {
	if (
		(s & 1 &&
			(r(0, 'li')(1, 'div')(2, 'span'),
			m(3),
			l()(),
			r(4, 'div')(5, 'div'),
			_(6, 'i-lucide', 1),
			r(7, 'span'),
			m(8),
			l()(),
			r(9, 'div')(10, 'span'),
			m(11),
			l(),
			_(12, 'i-lucide', 2),
			l()()()),
		s & 2)
	) {
		let o = c.$implicit;
		f();
		let n = x(0);
		(i(t('', n, '__list_item')),
			e(),
			i(t('', n, '__list_top')),
			e(),
			i(t('', n, '__list_institution')),
			e(),
			d(o.institution),
			e(),
			i(t('', n, '__list_bottom')),
			e(),
			i(t('', n, '__list_bottom_left')),
			e(),
			i(t('', n, '__list_icon')),
			p('size', 14)('strokeWidth', 2),
			e(),
			i(t('', n, '__list_name')),
			e(),
			d(o.name),
			e(),
			i(t('', n, '__list_bottom_right')),
			e(),
			i(t('', n, '__list_time_spent')),
			e(),
			d(o.timeSpent),
			e(),
			i(t('', n, '__list_icon')),
			p('size', 14)('strokeWidth', 2));
	}
}
var j = class s {
	courses = v();
	static ɵfac = function (o) {
		return new (o || s)();
	};
	static ɵcmp = u({
		type: s,
		selectors: [['resume-courses01']],
		inputs: { courses: [1, 'courses'] },
		decls: 5,
		vars: 6,
		consts: [
			[3, 'class'],
			['name', 'chevron-right', 3, 'size', 'strokeWidth'],
			['name', 'clock', 3, 'size', 'strokeWidth'],
		],
		template: function (o, n) {
			if ((o & 1 && (C(0), r(1, 'div')(2, 'ul'), h(3, se, 13, 37, 'li', 0, P), l()()), o & 2)) {
				let a = b('resume_courses01');
				(e(), i(a), e(), i(t('', a, '__list')), e(), w(n.courses()));
			}
		},
		dependencies: [T, z],
		styles: [
			'.resume_courses01[_ngcontent-%COMP%]{color:var(--grey7)}.resume_courses01__list_bottom[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-direction:initial;margin-bottom:15px;width:calc(100% + 3.5px)}.resume_courses01__list_bottom_left[_ngcontent-%COMP%], .resume_courses01__list_bottom_right[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:initial;flex-direction:initial}.resume_courses01__list_bottom_right[_ngcontent-%COMP%]     .resume_courses01__list_icon{color:var(--resume01_primary)}.resume_courses01__list_institution[_ngcontent-%COMP%]{font-size:12px;font-weight:400;letter-spacing:initial;line-height:initial;margin-bottom:5px;display:block}.resume_courses01__list_name[_ngcontent-%COMP%], .resume_courses01__list_time_spent[_ngcontent-%COMP%]{font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;display:block}.resume_courses01__list_time_spent[_ngcontent-%COMP%] + i-lucide[_ngcontent-%COMP%]{margin-left:5px}',
		],
	});
};
var Z = class s {
	locale = q(K);
	localize = $localize;
	ngOnInit() {
		(console.log('Current locale:', this.locale), console.log('Current localize:', this.localize));
	}
	hero = { name: ' Felipe Iwamoto', role: ' Desenvolvedor Full-Stack S\xEAnior' };
	contacts = [
		{ icon: 'map-pin', description: 'Brazil - Curitiba/PR' },
		{ icon: 'mail', description: 'felipe.t.iwamoto@gmail.com' },
		{ icon: 'phone', description: '(11) 9.8455-6053' },
		{ icon: 'external-link', description: 'felipetiwamoto.systemnear.com' },
	];
	about = {
		summary:
			' Sou programador com foco em ser desenvolvedor Full-Stack, atuando na \xE1rea web h\xE1 sete anos. Nas minhas experi\xEAncias, tive o privil\xE9gio de trabalhar em empresas nas quais tive autonomia de buscar conhecimento e aplicar no dia a dia. Me esforcei para ser um profissional capaz de suprir as necessidades das empresas, nas quais aprendi com o prox\xEDmo e ensinei. Meu objetivo \xE9 aperfei\xE7oar os meus conhecimentos e buscar novas aprendizagens dentro da empresas, sempre com olhar na evolu\xE7\xE3o pessoal e profissional.',
	};
	languages = [
		{ name: ' Portugu\xEAs', level: 10 },
		{ name: ' Ingl\xEAs', level: 6 },
		{ name: ' Japon\xEAs', level: 4 },
	];
	courses = [
		{ institution: ' Faculdade Opet', name: ' Jogos Digitais (T\xE9cnico)', timeSpent: '1 ano' },
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
	frontend = [
		{ name: 'HTML', level: 8 },
		{ name: 'CSS', level: 9 },
		{ name: 'JavaScript', level: 7 },
		{ name: 'Jquery', level: 5 },
		{ name: 'React/Redux', level: 5 },
		{ name: 'Angular 2+', level: 7 },
		{ name: 'UI Frameworks', level: 6 },
		{ name: 'Docker', level: 5 },
		{ name: 'CI/CD', level: 5 },
	];
	backend = [
		{ name: 'PHP', level: 5 },
		{ name: 'Laravel', level: 5 },
		{ name: 'Symfony', level: 5 },
		{ name: 'NodeJS', level: 7 },
		{ name: 'SQL', level: 5 },
		{ name: 'SOLID', level: 6 },
		{ name: 'Design Pattern', level: 5 },
	];
	experiences = [
		{
			company: 'Banco BS2',
			startedAt: ' SET 2022',
			endedAt: ' ATUAL',
			responsabilities: [
				' Recrutamento de Desenvolvedores',
				' Atua\xE7\xE3o como S\xEAnior.',
				' Manuten\xE7\xE3o nos sistemas existentes.',
				' Cria\xE7\xE3o de novas funcionalidades.',
			],
			softSkills: [
				' Capacidade de persuas\xE3o;',
				' Proatividade;',
				' Capacidade de trabalhar sob press\xE3o;',
				' Senso de lideran\xE7a;',
				' Capacidade anal\xEDtica.',
			],
			hardSkills: [' Cursos t\xE9cnicos;'],
			description:
				' Atua\xE7\xE3o como desenvolvedor s\xEAnior, com foco em arquitetura e padroniza\xE7\xE3o. Respons\xE1vel pelo Design System corporativo (componentes, diretivas, pipes e services), aplicado gradualmente em m\xFAltiplos projetos. Mentoria de novos colaboradores, palestras internas e migra\xE7\xF5es do Angular (12 \u2192 16 \u2192 18). Implementa\xE7\xE3o de i18n com suporte a Portugu\xEAs, ingl\xEAs e chin\xEAs.',
		},
		{
			company: 'Tagme',
			startedAt: ' JUN 2021 ',
			endedAt: ' AGO 2022',
			responsabilities: [
				' Atua\xE7\xE3o como S\xEAnior.',
				' Mentoriamento de novos colaboradores.',
				' Manuten\xE7\xE3o nos sistemas existentes.',
				' Cria\xE7\xE3o de novas funcionalidades.',
				' Cria\xE7\xE3o de novas funcionalidades.',
			],
			softSkills: [
				' Capacidade de persuas\xE3o;',
				' Proatividade;',
				' Capacidade de trabalhar sob press\xE3o;',
				' Senso de lideran\xE7a;',
				' Capacidade anal\xEDtica.',
			],
			hardSkills: [' Cursos t\xE9cnicos;'],
			description:
				' Lideran\xE7a do time de front-end na cria\xE7\xE3o de um novo projeto, atuando como desenvolvedor s\xEAnior com foco t\xE9cnico e arquitetural. Mentoria de novos colaboradores e condu\xE7\xE3o de palestras internas para capacita\xE7\xE3o do time no uso de tecnologias e boas pr\xE1ticas.',
		},
		{
			company: 'Tuxon',
			startedAt: ' FEV 2020',
			endedAt: ' NOV 2020',
			responsabilities: [
				' Manuten\xE7\xE3o nos sistemas existentes.',
				' Cria\xE7\xE3o de novas funcionalidades.',
				' Cria\xE7\xE3o de novas funcionalidades.',
			],
			softSkills: [
				' Capacidade de persuas\xE3o;',
				' Proatividade;',
				' Capacidade de trabalhar sob press\xE3o;',
				' Capacidade anal\xEDtica.',
			],
			hardSkills: [' Cursos t\xE9cnicos;', ' habilidades ligadas \xE0 inform\xE1tica.'],
			description:
				' Atua\xE7\xE3o na manuten\xE7\xE3o de sistemas existentes, desenvolvimento de novas funcionalidades e cria\xE7\xE3o de projetos do zero. Perfil proativo, com forte capacidade anal\xEDtica, habilidade para trabalhar sob press\xE3o e boa comunica\xE7\xE3o para alinhamento t\xE9cnico com o time.',
		},
		{
			company: '4You2 Idiomas',
			startedAt: ' ABR 2019',
			endedAt: ' SET 2019',
			responsabilities: [
				' Mentoriamento de novos colaboradores.',
				' Manuten\xE7\xE3o nos sistemas existentes.',
				' Cria\xE7\xE3o de novas funcionalidades.',
				' Cria\xE7\xE3o de novas funcionalidades.',
			],
			softSkills: [
				' Proatividade;',
				' Capacidade de trabalhar sob press\xE3o;',
				' Senso de lideran\xE7a;',
				' Capacidade anal\xEDtica.',
			],
			hardSkills: [' Conhecimento em uma l\xEDngua estrangeira;', ' Cursos t\xE9cnicos;'],
			description:
				' Atua\xE7\xE3o na manuten\xE7\xE3o e evolu\xE7\xE3o de sistemas existentes, desenvolvimento de novas funcionalidades e cria\xE7\xE3o de projetos do zero. Forte experi\xEAncia com ingl\xEAs no dia a dia, participando de dailies e alinhamentos t\xE9cnicos com falantes nativos, entendendo demandas diretamente com o time internacional e realizando implementa\xE7\xF5es e ajustes cont\xEDnuos. Atua\xE7\xE3o ativa no mentoriamento de novos colaboradores, apoiando onboarding, direcionamento t\xE9cnico e evolu\xE7\xE3o profissional, com perfil proativo, anal\xEDtico e senso de lideran\xE7a.',
		},
		{
			company: 'SPRO IT Solutions',
			startedAt: ' SET 2018',
			endedAt: ' ABR 2019',
			responsabilities: [
				' Manuten\xE7\xE3o nos sistemas existentes.',
				' Cria\xE7\xE3o de novas funcionalidades.',
				' Cria\xE7\xE3o de novas funcionalidades.',
			],
			softSkills: [' Proatividade;', ' Capacidade de trabalhar sob press\xE3o;', ' Capacidade anal\xEDtica.'],
			hardSkills: [' Cursos t\xE9cnicos;'],
			description:
				' Atua\xE7\xE3o na manuten\xE7\xE3o de sistemas existentes, desenvolvimento de novas funcionalidades e cria\xE7\xE3o de projetos do zero, com forte foco em automa\xE7\xE3o de processos. Mapeamento e entendimento de tarefas manuais que levavam dias ou semanas para serem executadas, criando automa\xE7\xF5es que passaram a realizar esses processos em segundos, acelerando significativamente o fluxo de trabalho e apoiando diretamente outras \xE1reas da empresa.',
		},
		{
			company: 'DevMaker',
			startedAt: ' OUT 2017',
			endedAt: ' SET 2018',
			responsabilities: [
				' Manuten\xE7\xE3o nos sistemas existentes.',
				' Cria\xE7\xE3o de novas funcionalidades.',
				' Cria\xE7\xE3o de novas funcionalidades.',
			],
			softSkills: [' Proatividade;', ' Capacidade de trabalhar sob press\xE3o;', ' Capacidade anal\xEDtica.'],
			hardSkills: [' Cursos t\xE9cnicos;'],
			description:
				' Apesar da posi\xE7\xE3o j\xFAnior, identifiquei a alta demanda de projetos e a dificuldade do time em manter o ritmo de entregas. Em alinhamento com o time de design, liderei a padroniza\xE7\xE3o dos componentes da empresa, criando varia\xE7\xF5es reutiliz\xE1veis aplicadas em todos os novos projetos. Para viabilizar essa iniciativa, estudei profundamente frameworks como Bootstrap, Material e Semantic UI, desenvolvendo uma solu\xE7\xE3o adaptada \xE0s necessidades da empresa, o que contribuiu para redu\xE7\xE3o de horas extras e trabalho aos fins de semana.',
		},
		{
			company: '01Tec',
			startedAt: ' ABR 2015',
			endedAt: ' SET 2016',
			responsabilities: [
				' Manuten\xE7\xE3o nos sistemas existentes.',
				' Cria\xE7\xE3o de novas funcionalidades.',
			],
			softSkills: [' Proatividade;', ' Capacidade anal\xEDtica.'],
			hardSkills: [' Cursos t\xE9cnicos;'],
			description:
				' Experi\xEAncia de est\xE1gio onde iniciei com conhecimentos b\xE1sicos em l\xF3gica de programa\xE7\xE3o e evolu\xED para o desenvolvimento web completo, aprendendo HTML, CSS, JavaScript, jQuery, PHP e MySQL, al\xE9m da cria\xE7\xE3o de temas para WordPress. Ap\xF3s o per\xEDodo de est\xE1gio, atuei como freelancer para a empresa por alguns meses, contribuindo em projetos adicionais.',
		},
		{
			company: 'Servi\xE7os comunit\xE1rios',
			startedAt: ' ABR 2015',
			endedAt: ' SET 2016',
			responsabilities: [
				' Sou programador com foco em ser desenvolvedor Full-Stack, atuando na \xE1rea web h\xE1 sete anos. Nas minhas experi\xEAncias, tive o privil\xE9gio de trabalhar em empresas nas quais tive autonomia de buscar conhecimento e aplicar no dia a dia. Me esforcei para ser um profissional capaz de suprir as necessidades das empresas, nas quais aprendi com o prox\xEDmo e ensinei. Meu objetivo \xE9 aperfei\xE7oar os meus conhecimentos e buscar novas aprendizagens dentro da empresas, sempre com olhar na evolu\xE7\xE3o pessoal e profissional.',
				' Sou programador com foco em ser desenvolvedor Full-Stack, atuando na \xE1rea web h\xE1 sete anos. Nas minhas experi\xEAncias, tive o privil\xE9gio de trabalhar em empresas nas quais tive autonomia de buscar conhecimento e aplicar no dia a dia. Me esforcei para ser um profissional capaz de suprir as necessidades das empresas, nas quais aprendi com o prox\xEDmo e ensinei. Meu objetivo \xE9 aperfei\xE7oar os meus conhecimentos e buscar novas aprendizagens dentro da empresas, sempre com olhar na evolu\xE7\xE3o pessoal e profissional.',
				' Sou programador com foco em ser desenvolvedor Full-Stack, atuando na \xE1rea web h\xE1 sete anos. Nas minhas experi\xEAncias, tive o privil\xE9gio de trabalhar em empresas nas quais tive autonomia de buscar conhecimento e aplicar no dia a dia. Me esforcei para ser um profissional capaz de suprir as necessidades das empresas, nas quais aprendi com o prox\xEDmo e ensinei. Meu objetivo \xE9 aperfei\xE7oar os meus conhecimentos e buscar novas aprendizagens dentro da empresas, sempre com olhar na evolu\xE7\xE3o pessoal e profissional.',
				' Sou programador com foco em ser desenvolvedor Full-Stack, atuando na \xE1rea web h\xE1 sete anos. Nas minhas experi\xEAncias, tive o privil\xE9gio de trabalhar em empresas nas quais tive autonomia de buscar conhecimento e aplicar no dia a dia. Me esforcei para ser um profissional capaz de suprir as necessidades das empresas, nas quais aprendi com o prox\xEDmo e ensinei. Meu objetivo \xE9 aperfei\xE7oar os meus conhecimentos e buscar novas aprendizagens dentro da empresas, sempre com olhar na evolu\xE7\xE3o pessoal e profissional.',
				' Sou programador com foco em ser desenvolvedor Full-Stack, atuando na \xE1rea web h\xE1 sete anos. Nas minhas experi\xEAncias, tive o privil\xE9gio de trabalhar em empresas nas quais tive autonomia de buscar conhecimento e aplicar no dia a dia. Me esforcei para ser um profissional capaz de suprir as necessidades das empresas, nas quais aprendi com o prox\xEDmo e ensinei. Meu objetivo \xE9 aperfei\xE7oar os meus conhecimentos e buscar novas aprendizagens dentro da empresas, sempre com olhar na evolu\xE7\xE3o pessoal e profissional.',
				' Sou programador com foco em ser desenvolvedor Full-Stack, atuando na \xE1rea web h\xE1 sete anos. Nas minhas experi\xEAncias, tive o privil\xE9gio de trabalhar em empresas nas quais tive autonomia de buscar conhecimento e aplicar no dia a dia. Me esforcei para ser um profissional capaz de suprir as necessidades das empresas, nas quais aprendi com o prox\xEDmo e ensinei. Meu objetivo \xE9 aperfei\xE7oar os meus conhecimentos e buscar novas aprendizagens dentro da empresas, sempre com olhar na evolu\xE7\xE3o pessoal e profissional.',
				' Sou programador com foco em ser desenvolvedor Full-Stack, atuando na \xE1rea web h\xE1 sete anos. Nas minhas experi\xEAncias, tive o privil\xE9gio de trabalhar em empresas nas quais tive autonomia de buscar conhecimento e aplicar no dia a dia. Me esforcei para ser um profissional capaz de suprir as necessidades das empresas, nas quais aprendi com o prox\xEDmo e ensinei. Meu objetivo \xE9 aperfei\xE7oar os meus conhecimentos e buscar novas aprendizagens dentro da empresas, sempre com olhar na evolu\xE7\xE3o pessoal e profissional.',
			],
			description:
				' Sou programador com foco em ser desenvolvedor Full-Stack, atuando na \xE1rea web h\xE1 sete anos. Nas minhas experi\xEAncias, tive o privil\xE9gio de trabalhar em empresas nas quais tive autonomia de buscar conhecimento e aplicar no dia a dia. Me esforcei para ser um profissional capaz de suprir as necessidades das empresas, nas quais aprendi com o prox\xEDmo e ensinei. Meu objetivo \xE9 aperfei\xE7oar os meus conhecimentos e buscar novas aprendizagens dentro da empresas, sempre com olhar na evolu\xE7\xE3o pessoal e profissional.',
		},
	];
	static ɵfac = function (o) {
		return new (o || s)();
	};
	static ɵcmp = u({
		type: s,
		selectors: [['app-felipetiwamoto']],
		decls: 55,
		vars: 133,
		consts: () => {
			let c;
			c = 'Portugu\xEAs';
			let o;
			o = 'Ingl\xEAs';
			let n;
			n = 'EXPERI\xCANCIAS';
			let a;
			a = 'SOBRE MIM';
			let g;
			g = 'LINGUAGENS';
			let R;
			R = 'CURSOS';
			let y;
			y = 'HABILIDADES';
			let X;
			X = 'Frontend';
			let H;
			return (
				(H = 'Backend'),
				[
					c,
					o,
					n,
					a,
					g,
					R,
					y,
					X,
					H,
					['href', '/portfolio/pt'],
					['href', '/portfolio/en'],
					[3, 'hero'],
					[3, 'contacts'],
					['name', 'briefcase-business', 3, 'size', 'strokeWidth'],
					[3, 'experiences'],
					['name', 'user', 3, 'size', 'strokeWidth'],
					[3, 'about'],
					['name', 'globe', 3, 'size', 'strokeWidth'],
					[3, 'skills'],
					['name', 'graduation-cap', 3, 'size', 'strokeWidth'],
					[3, 'courses'],
					['name', 'medal', 3, 'size', 'strokeWidth'],
				]
			);
		},
		template: function (o, n) {
			if (
				(o & 1 &&
					(r(0, 'div')(1, 'div')(2, 'ul')(3, 'li')(4, 'a', 9),
					S(5, 0),
					l()(),
					r(6, 'li')(7, 'a', 10),
					S(8, 1),
					l()()(),
					r(9, 'div')(10, 'div')(11, 'div'),
					_(12, 'resume-hero01', 11),
					l(),
					r(13, 'div'),
					_(14, 'resume-contacts01', 12),
					l()(),
					r(15, 'div')(16, 'div')(17, 'div')(18, 'div'),
					_(19, 'i-lucide', 13),
					r(20, 'span'),
					S(21, 2),
					l()(),
					_(22, 'resume-experiences01', 14),
					l()(),
					r(23, 'div')(24, 'div')(25, 'div'),
					_(26, 'i-lucide', 15),
					r(27, 'span'),
					S(28, 3),
					l()(),
					_(29, 'resume-about01', 16),
					l(),
					r(30, 'div')(31, 'div'),
					_(32, 'i-lucide', 17),
					r(33, 'span'),
					S(34, 4),
					l()(),
					_(35, 'resume-skills01', 18),
					l(),
					r(36, 'div')(37, 'div'),
					_(38, 'i-lucide', 19),
					r(39, 'span'),
					S(40, 5),
					l()(),
					_(41, 'resume-courses01', 20),
					l(),
					r(42, 'div')(43, 'div'),
					_(44, 'i-lucide', 21),
					r(45, 'span'),
					S(46, 6),
					l()(),
					r(47, 'div')(48, 'span'),
					S(49, 7),
					l(),
					_(50, 'resume-skills01', 18),
					l(),
					r(51, 'div')(52, 'span'),
					S(53, 8),
					l(),
					_(54, 'resume-skills01', 18),
					l()()()()()()()),
				o & 2)
			) {
				let a = 'resume';
				(i(a),
					e(),
					i(t('', a, '__page')),
					e(),
					i(t('', a, '__lang')),
					e(),
					i(t('', a, '__lang_item')),
					e(),
					i(k('', a, '__lang_link ', n.locale === 'pt-BR' ? a + '__lang_link--active' : '')),
					e(2),
					i(t('', a, '__lang_item')),
					e(),
					i(k('', a, '__lang_link ', n.locale !== 'pt-BR' ? a + '__lang_link--active' : '')),
					e(2),
					i(t('', a, '__container')),
					e(),
					i(t('', a, '__top')),
					e(),
					i(t('', a, '__top_left')),
					e(),
					p('hero', n.hero),
					e(),
					i(t('', a, '__top_right')),
					e(),
					p('contacts', n.contacts),
					e(),
					i(t('', a, '__bottom')),
					e(),
					i(t('', a, '__bottom_left')),
					e(),
					i(t('', a, '__section')),
					e(),
					i(t('', a, '__section_title')),
					e(),
					i(t('', a, '__section_title_icon')),
					p('size', 24)('strokeWidth', 2),
					e(),
					i(t('', a, '__section_title_text')),
					e(2),
					p('experiences', n.experiences),
					e(),
					i(t('', a, '__bottom_right')),
					e(),
					i(t('', a, '__section')),
					e(),
					i(t('', a, '__section_title')),
					e(),
					i(t('', a, '__section_title_icon')),
					p('size', 24)('strokeWidth', 2),
					e(),
					i(t('', a, '__section_title_text')),
					e(2),
					p('about', n.about),
					e(),
					i(t('', a, '__section')),
					e(),
					i(t('', a, '__section_title')),
					e(),
					i(t('', a, '__section_title_icon')),
					p('size', 24)('strokeWidth', 2),
					e(),
					i(t('', a, '__section_title_text')),
					e(2),
					p('skills', n.languages),
					e(),
					i(t('', a, '__section')),
					e(),
					i(t('', a, '__section_title')),
					e(),
					i(t('', a, '__section_title_icon')),
					p('size', 24)('strokeWidth', 2),
					e(),
					i(t('', a, '__section_title_text')),
					e(2),
					p('courses', n.courses),
					e(),
					i(t('', a, '__section')),
					e(),
					i(t('', a, '__section_title')),
					e(),
					i(t('', a, '__section_title_icon')),
					p('size', 24)('strokeWidth', 2),
					e(),
					i(t('', a, '__section_title_text')),
					e(2),
					i(t('', a, '__sub_section')),
					e(),
					i(t('', a, '__section_sub_title')),
					e(2),
					p('skills', n.frontend),
					e(),
					i(t('', a, '__sub_section')),
					e(),
					i(t('', a, '__section_sub_title')),
					e(2),
					p('skills', n.backend));
			}
		},
		dependencies: [U, W, N, D, G, j, T, z],
		styles: [
			'.resume[_ngcontent-%COMP%]{--resume_right_side: 100%;padding:10px;background-color:var(--greye);display:flex;align-items:center;justify-content:center;flex-direction:initial}@media all and (min-width:768px){.resume[_ngcontent-%COMP%]{padding:100px 10px 50px;--resume_right_side: 200px}}.resume__page[_ngcontent-%COMP%]{position:relative;width:min(100%,25cm);min-height:33.7cm;padding:30px;box-sizing:border-box;background-color:var(--greyf)}@media all and (min-width:768px){.resume__page[_ngcontent-%COMP%]{padding:90px}}.resume__lang[_ngcontent-%COMP%]{position:absolute;top:-40px;right:0;display:flex;align-items:center;justify-content:center;flex-direction:initial;margin-bottom:20px;column-gap:10px}.resume__lang_link[_ngcontent-%COMP%]{padding:5px 10px;font-size:14px;font-weight:300;letter-spacing:initial;line-height:initial;cursor:pointer;color:var(--grey7);border-radius:50px;background-color:var(--greyf)}.resume__lang_link--active[_ngcontent-%COMP%]{color:var(--resume01_primary);font-weight:600}.resume__container[_ngcontent-%COMP%]{width:min(100% - 20px,768px);margin-inline:auto;position:relative}.resume__top[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;row-gap:30px}@media all and (min-width:768px){.resume__top[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 200px;column-gap:30px;row-gap:0px}}.resume__top_right[_ngcontent-%COMP%]{width:var(--resume_right_side)}.resume__bottom[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;row-gap:30px}@media all and (min-width:768px){.resume__bottom[_ngcontent-%COMP%]{grid-template-columns:1fr 200px;column-gap:30px;row-gap:0px}}.resume__bottom_right[_ngcontent-%COMP%]{width:var(--resume_right_side)}.resume__section[_ngcontent-%COMP%], .resume__sub_section[_ngcontent-%COMP%]{margin-top:30px}.resume__section_title[_ngcontent-%COMP%]{color:var(--resume01_primary);display:flex;align-items:center;justify-content:initial;flex-direction:initial;margin-bottom:30px}.resume__section_title[_ngcontent-%COMP%]   i-lucide[_ngcontent-%COMP%]{margin-right:10px}.resume__section_title_text[_ngcontent-%COMP%]{font-size:18px;font-weight:400;letter-spacing:initial;line-height:initial;display:block}.resume__section_sub_title[_ngcontent-%COMP%]{font-size:14px;font-weight:300;letter-spacing:initial;line-height:initial;margin-bottom:15px;display:block;color:var(--grey7)}',
		],
	});
};
export { Z as FelipeTiwamoto }; /**i18n:9565df162215a628a983dd2581f70df0c5713e3b5336e9ccae8a17ef4baab485*/
