import {
	Aa as p,
	Ba as l,
	Ca as r,
	Da as d,
	Ea as x,
	Fa as M,
	Ga as z,
	Ha as H,
	Ia as g,
	Ja as i,
	Ka as m,
	La as u,
	Ma as q,
	Na as h,
	Oa as C,
	Pa as v,
	Qa as J,
	Ra as t,
	Sa as $,
	Ua as f,
	Ya as P,
	Za as E,
	ga as U,
	ha as e,
	pa as _,
	va as w,
	wa as D,
	xa as y,
	ya as k,
	za as S,
} from './chunk-MZYUXCZI.js';
function Q(o, c) {
	if ((o & 1 && (x(0, 'div'), z(1, 'img', 1), M()), o & 2)) {
		let a,
			s,
			n = g(),
			b = v(0);
		(i(t('', b, '__left')),
			e(),
			i(t('', b, '__image')),
			H('alt', J((a = n.hero()) == null ? null : a.name))('src', (s = n.hero()) == null ? null : s.image, U));
	}
}
var I = class o {
	hero = f();
	static ɵfac = function (a) {
		return new (a || o)();
	};
	static ɵcmp = _({
		type: o,
		selectors: [['resume-hero01']],
		inputs: { hero: [1, 'hero'] },
		decls: 9,
		vars: 18,
		consts: [
			[3, 'class'],
			[3, 'src', 'alt'],
		],
		template: function (a, s) {
			if (
				(a & 1 &&
					(h(0),
					x(1, 'div'),
					w(2, Q, 2, 9, 'div', 0),
					z(3, 'div'),
					x(4, 'div')(5, 'span'),
					m(6),
					M(),
					x(7, 'span'),
					m(8),
					M()()()),
				a & 2)
			) {
				let n,
					b,
					B,
					A = C('resume_hero01');
				(e(),
					i(A),
					e(),
					D((n = s.hero()) != null && n.image ? 2 : -1),
					e(),
					i(t('', A, '__left')),
					e(),
					i(t('', A, '__right')),
					e(),
					i(t('', A, '__name')),
					e(),
					u((b = s.hero()) == null ? null : b.name),
					e(),
					i(t('', A, '__role')),
					e(),
					u((B = s.hero()) == null ? null : B.role));
			}
		},
		styles: [
			'.resume_hero01[_ngcontent-%COMP%]{text-align:center}@media all and (min-width:768px){.resume_hero01[_ngcontent-%COMP%]{text-align:left}}.resume_hero01__name[_ngcontent-%COMP%]{font-size:clamp(20px,5vw,48px);font-weight:700;letter-spacing:initial;line-height:initial;color:var(--resume01_primary);display:block}.resume_hero01__role[_ngcontent-%COMP%]{font-size:clamp(14px,3vw,18px);font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);display:block}',
		],
	});
};
function V(o, c) {
	if ((o & 1 && (l(0, 'li'), d(1, 'i-lucide', 1), l(2, 'span'), m(3), r()()), o & 2)) {
		let a = c.$implicit;
		g();
		let s = v(0);
		(i(t('', s, '__list_item')),
			e(),
			i(t('', s, '__list_icon')),
			p('name', a.icon)('size', 16)('strokeWidth', 2),
			e(),
			i(t('', s, '__list_name')),
			e(),
			u(a.description));
	}
}
var L = class o {
	contacts = f();
	static ɵfac = function (a) {
		return new (a || o)();
	};
	static ɵcmp = _({
		type: o,
		selectors: [['resume-contacts01']],
		inputs: { contacts: [1, 'contacts'] },
		decls: 5,
		vars: 6,
		consts: [
			[3, 'class'],
			[3, 'name', 'size', 'strokeWidth'],
		],
		template: function (a, s) {
			if ((a & 1 && (h(0), l(1, 'div')(2, 'ul'), k(3, V, 4, 13, 'li', 0, y), r()()), a & 2)) {
				let n = C('resume_contacts01');
				(e(), i(n), e(), i(t('', n, '__list')), e(), S(s.contacts()));
			}
		},
		dependencies: [E, P],
		styles: [
			'.resume_contacts01__list_item[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex-direction:initial;margin-bottom:15px}@media all and (min-width:768px){.resume_contacts01__list_item[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:initial;flex-direction:initial}}.resume_contacts01__list_name[_ngcontent-%COMP%]{font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);display:block;margin-top:2px}.resume_contacts01[_ngcontent-%COMP%]     .resume_contacts01__list_icon{stroke:var(--resume01_primary);margin-right:5px}',
		],
	});
};
function X(o, c) {
	if ((o & 1 && (l(0, 'span'), m(1), r()), o & 2)) {
		let a = g().$implicit;
		g();
		let s = v(0);
		(i(t('', s, '__item_description')), e(), u(a.description));
	}
}
function Y(o, c) {
	if (
		(o & 1 &&
			(l(0, 'div')(1, 'div')(2, 'div'),
			d(3, 'i-lucide', 1),
			m(4),
			r(),
			l(5, 'div')(6, 'span'),
			m(7),
			r(),
			l(8, 'span'),
			m(9),
			r(),
			d(10, 'i-lucide', 2),
			r()(),
			l(11, 'div'),
			w(12, X, 2, 4, 'span', 0),
			r()()),
		o & 2)
	) {
		let a = c.$implicit;
		g();
		let s = v(0);
		(i(t('', s, '__item')),
			e(),
			i(t('', s, '__item_top')),
			e(),
			i(t('', s, '__item_company')),
			e(),
			i(t('', s, '__item_company_icon')),
			p('size', 18)('strokeWidth', 2),
			e(),
			q(' ', a.company, ' '),
			e(),
			i(t('', s, '__item_period')),
			e(),
			i(t('', s, '__item_from')),
			e(),
			u(a.startedAt),
			e(),
			i(t('', s, '__item_to')),
			e(),
			u(a.endedAt ?? 'ATUAL'),
			e(),
			i(t('', s, '__item_period_icon')),
			p('size', 14)('strokeWidth', 2),
			e(),
			i(t('', s, '__item_bottom')),
			e(),
			D(a.description ? 12 : -1));
	}
}
var T = class o {
	experiences = f();
	static ɵfac = function (a) {
		return new (a || o)();
	};
	static ɵcmp = _({
		type: o,
		selectors: [['resume-experiences01']],
		inputs: { experiences: [1, 'experiences'] },
		decls: 4,
		vars: 4,
		consts: [
			[3, 'class'],
			['name', 'chevron-right', 3, 'size', 'strokeWidth'],
			['name', 'calendar', 3, 'size', 'strokeWidth'],
		],
		template: function (a, s) {
			if ((a & 1 && (h(0), l(1, 'div'), k(2, Y, 13, 35, 'div', 0, y), r()), a & 2)) {
				let n = C('resume_experiences01');
				(e(), i(t('', n, '__item')), e(), S(s.experiences()));
			}
		},
		dependencies: [E, P],
		styles: [
			'.resume_experiences01__item[_ngcontent-%COMP%]{margin-bottom:30px}.resume_experiences01__item_job[_ngcontent-%COMP%]{display:none;margin-bottom:15px;font-size:14px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey7)}.resume_experiences01__item_top[_ngcontent-%COMP%]{margin-bottom:15px;display:flex;align-items:center;justify-content:space-between;flex-direction:initial}.resume_experiences01__item_company[_ngcontent-%COMP%]{font-size:14px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey7);display:flex;align-items:center;justify-content:initial;flex-direction:initial}.resume_experiences01__item_company[_ngcontent-%COMP%]   i-lucide[_ngcontent-%COMP%]{color:var(--resume01_primary);margin-right:5px}.resume_experiences01__item_period[_ngcontent-%COMP%]{align-items:baseline;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;display:flex;align-items:center;justify-content:initial;flex-direction:initial;color:var(--grey7)}.resume_experiences01__item_period[_ngcontent-%COMP%]   i-lucide[_ngcontent-%COMP%]{color:var(--resume01_primary);margin-left:5px}.resume_experiences01__item_from[_ngcontent-%COMP%]{text-transform:capitalize}.resume_experiences01__item_from[_ngcontent-%COMP%]:after{content:"-";display:inline-flex;margin-inline:5px}.resume_experiences01__item_to[_ngcontent-%COMP%], .resume_experiences01__item_is_current[_ngcontent-%COMP%]{text-transform:capitalize}.resume_experiences01__item_description[_ngcontent-%COMP%]{font-size:14px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7)}.resume_experiences01__item_list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin-inline:-15px}.resume_experiences01__item_list[_ngcontent-%COMP%] + .resume_experiences01__item_list[_ngcontent-%COMP%]{margin-top:10px}.resume_experiences01__item_list_title[_ngcontent-%COMP%]{margin-block:15px;font-size:12px;font-weight:700;letter-spacing:initial;line-height:initial;color:var(--grey7);display:flex;align-items:center;justify-content:initial;flex-direction:initial}.resume_experiences01__item_list_title[_ngcontent-%COMP%]   i-lucide[_ngcontent-%COMP%]{color:var(--resume01_primary)}.resume_experiences01__item_list_item[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:initial;flex-direction:initial;box-sizing:border-box;max-width:50%;flex-basis:50%;padding-inline:15px;font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);margin-bottom:5px}',
		],
	});
};
var j = class o {
	about = f();
	static ɵfac = function (a) {
		return new (a || o)();
	};
	static ɵcmp = _({
		type: o,
		selectors: [['resume-about01']],
		inputs: { about: [1, 'about'] },
		decls: 3,
		vars: 6,
		template: function (a, s) {
			if ((a & 1 && (x(0, 'div')(1, 'span'), m(2), M()()), a & 2)) {
				let n,
					b = 'resume_about01';
				(i(b), e(), i(t('', b, '__summary')), e(), u((n = s.about()) == null ? null : n.summary));
			}
		},
		styles: [
			'.resume_about01__summary[_ngcontent-%COMP%]{font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);display:block}',
		],
	});
};
function K(o, c) {
	if ((o & 1 && z(0, 'li'), o & 2)) {
		let a = c.$index,
			s = g().$implicit,
			n = g(),
			b = v(0);
		i($('', b, '__bullet_item ', n.isBulletItemActive(s, a + 1)));
	}
}
function Z(o, c) {
	if ((o & 1 && (x(0, 'li')(1, 'span'), m(2), M(), x(3, 'ul'), k(4, K, 1, 4, 'li', 0, y), M()()), o & 2)) {
		let a = c.$implicit,
			s = g(),
			n = v(0);
		(i(t('', n, '__list_item')),
			e(),
			i(t('', n, '__list_name')),
			e(),
			u(a.name),
			e(),
			i(t('', n, '__bullet')),
			e(),
			S(s.levels));
	}
}
var N = class o {
	skills = f();
	levels = Array(10).fill(0);
	isBulletItemActive(c, a) {
		return c?.level && c.level >= a ? 'active' : '';
	}
	static ɵfac = function (a) {
		return new (a || o)();
	};
	static ɵcmp = _({
		type: o,
		selectors: [['resume-skills01']],
		inputs: { skills: [1, 'skills'] },
		decls: 5,
		vars: 6,
		consts: [[3, 'class']],
		template: function (a, s) {
			if ((a & 1 && (h(0), x(1, 'div')(2, 'ul'), k(3, Z, 6, 10, 'li', 0, y), M()()), a & 2)) {
				let n = C('resume_skills01');
				(e(), i(n), e(), i(t('', n, '__list')), e(), S(s.skills()));
			}
		},
		styles: [
			'.resume_skills01__list[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.resume_skills01__list_name[_ngcontent-%COMP%]{font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;color:var(--grey7);display:block}.resume_skills01__bullet[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(10,auto);margin-top:2.5px}.resume_skills01__bullet_item[_ngcontent-%COMP%]{width:6px;height:6px;border-radius:50px;background-color:var(--greyd)}.resume_skills01__bullet_item[_ngcontent-%COMP%] + .resume_skills01__bullet_item[_ngcontent-%COMP%]{margin-left:2.5px}.resume_skills01__bullet_item.active[_ngcontent-%COMP%]{background-color:var(--resume01_primary)}',
		],
	});
};
function ee(o, c) {
	if (
		(o & 1 &&
			(l(0, 'li')(1, 'div')(2, 'span'),
			m(3),
			r()(),
			l(4, 'div')(5, 'div'),
			d(6, 'i-lucide', 1),
			l(7, 'span'),
			m(8),
			r()(),
			l(9, 'div')(10, 'span'),
			m(11),
			r(),
			d(12, 'i-lucide', 2),
			r()()()),
		o & 2)
	) {
		let a = c.$implicit;
		g();
		let s = v(0);
		(i(t('', s, '__list_item')),
			e(),
			i(t('', s, '__list_top')),
			e(),
			i(t('', s, '__list_institution')),
			e(),
			u(a.institution),
			e(),
			i(t('', s, '__list_bottom')),
			e(),
			i(t('', s, '__list_bottom_left')),
			e(),
			i(t('', s, '__list_icon')),
			p('size', 14)('strokeWidth', 2),
			e(),
			i(t('', s, '__list_name')),
			e(),
			u(a.name),
			e(),
			i(t('', s, '__list_bottom_right')),
			e(),
			i(t('', s, '__list_time_spent')),
			e(),
			u(a.timeSpent),
			e(),
			i(t('', s, '__list_icon')),
			p('size', 14)('strokeWidth', 2));
	}
}
var F = class o {
	courses = f();
	static ɵfac = function (a) {
		return new (a || o)();
	};
	static ɵcmp = _({
		type: o,
		selectors: [['resume-courses01']],
		inputs: { courses: [1, 'courses'] },
		decls: 5,
		vars: 6,
		consts: [
			[3, 'class'],
			['name', 'chevron-right', 3, 'size', 'strokeWidth'],
			['name', 'clock', 3, 'size', 'strokeWidth'],
		],
		template: function (a, s) {
			if ((a & 1 && (h(0), l(1, 'div')(2, 'ul'), k(3, ee, 13, 37, 'li', 0, y), r()()), a & 2)) {
				let n = C('resume_courses01');
				(e(), i(n), e(), i(t('', n, '__list')), e(), S(s.courses()));
			}
		},
		dependencies: [E, P],
		styles: [
			'.resume_courses01[_ngcontent-%COMP%]{color:var(--grey7)}.resume_courses01__list_bottom[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-direction:initial;margin-bottom:15px;width:calc(100% + 3.5px)}.resume_courses01__list_bottom_left[_ngcontent-%COMP%], .resume_courses01__list_bottom_right[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:initial;flex-direction:initial}.resume_courses01__list_bottom_right[_ngcontent-%COMP%]     .resume_courses01__list_icon{color:var(--resume01_primary)}.resume_courses01__list_institution[_ngcontent-%COMP%]{font-size:12px;font-weight:400;letter-spacing:initial;line-height:initial;margin-bottom:5px;display:block}.resume_courses01__list_name[_ngcontent-%COMP%], .resume_courses01__list_time_spent[_ngcontent-%COMP%]{font-size:12px;font-weight:300;letter-spacing:initial;line-height:initial;display:block}.resume_courses01__list_time_spent[_ngcontent-%COMP%] + i-lucide[_ngcontent-%COMP%]{margin-left:5px}',
		],
	});
};
var G = class o {
	hero = { name: 'Felipe Iwamoto', role: 'Desenvolvedor Full-Stack S\xEAnior' };
	contacts = [
		{ icon: 'map-pin', description: 'Brazil - Curitiba/PR' },
		{ icon: 'mail', description: 'felipe.t.iwamoto@gmail.com' },
		{ icon: 'phone', description: '(11) 9.8455-6053' },
		{ icon: 'external-link', description: 'felipetiwamoto.systemnear.com' },
	];
	about = {
		summary:
			'Sou programador com foco em ser desenvolvedor Full-Stack, atuando na \xE1rea web h\xE1 sete anos. Nas minhas experi\xEAncias, tive o privil\xE9gio de trabalhar em empresas nas quais tive autonomia de buscar conhecimento e aplicar no dia a dia. Me esforcei para ser um profissional capaz de suprir as necessidades das empresas, nas quais aprendi com o prox\xEDmo e ensinei. Meu objetivo \xE9 aperfei\xE7oar os meus conhecimentos e buscar novas aprendizagens dentro da empresas, sempre com olhar na evolu\xE7\xE3o pessoal e profissional.',
	};
	languages = [
		{ name: 'Portugu\xEAs', level: 10 },
		{ name: 'Ingl\xEAs', level: 6 },
		{ name: 'Japon\xEAs', level: 4 },
	];
	courses = [
		{ institution: 'Faculdade Opet', name: 'Jogos Digitais (T\xE9cnico)', timeSpent: '1 ano' },
		{ institution: 'Udemy', name: 'Desenvolvimento Web', timeSpent: '54h' },
		{ institution: 'Udemy', name: 'Programa\xE7\xE3o Reactiva', timeSpent: '17h' },
		{ institution: 'Udemy', name: 'PHP/Laravel/Symfony', timeSpent: '115h' },
		{ institution: 'Udemy', name: 'Angular 2+', timeSpent: '29h' },
		{ institution: 'Udemy', name: 'React/Redux', timeSpent: '54h' },
		{ institution: 'Udemy', name: 'NodeJS', timeSpent: '15h' },
		{ institution: 'Udemy', name: 'Design Pattern', timeSpent: '29h' },
		{ institution: 'Udemy', name: 'SOLID', timeSpent: '5h' },
		{ institution: 'Udemy', name: 'Design de Interface', timeSpent: '77h' },
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
			startedAt: 'SET 2022',
			endedAt: 'ATUAL',
			responsabilities: [
				'Recrutamento de Desenvolvedores',
				'Atua\xE7\xE3o como S\xEAnior.',
				'Manuten\xE7\xE3o nos sistemas existentes.',
				'Cria\xE7\xE3o de novas funcionalidades.',
			],
			softSkills: [
				'Capacidade de persuas\xE3o;',
				'Proatividade;',
				'Capacidade de trabalhar sob press\xE3o;',
				'Senso de lideran\xE7a;',
				'Capacidade anal\xEDtica.',
			],
			hardSkills: ['Cursos t\xE9cnicos;'],
			description:
				'Atua\xE7\xE3o como desenvolvedor s\xEAnior, com foco em arquitetura e padroniza\xE7\xE3o. Respons\xE1vel pelo Design System corporativo (componentes, diretivas, pipes e services), aplicado gradualmente em m\xFAltiplos projetos. Mentoria de novos colaboradores, palestras internas e  migra\xE7\xF5es do Angular (12 \u2192 16 \u2192 18). Implementa\xE7\xE3o de i18n com suporte a Portugu\xEAs, ingl\xEAs e chin\xEAs.',
		},
		{
			company: 'Tagme',
			startedAt: 'JUN 2021  ',
			endedAt: 'AGO 2022',
			responsabilities: [
				'Atua\xE7\xE3o como S\xEAnior.',
				'Mentoriamento de novos colaboradores.',
				'Manuten\xE7\xE3o nos sistemas existentes.',
				'Cria\xE7\xE3o de novas funcionalidades.',
				'Cria\xE7\xE3o de projetos do zero.',
			],
			softSkills: [
				'Capacidade de persuas\xE3o;',
				'Proatividade;',
				'Capacidade de trabalhar sob press\xE3o;',
				'Senso de lideran\xE7a;',
				'Capacidade anal\xEDtica.',
			],
			hardSkills: ['Cursos t\xE9cnicos;'],
			description:
				'Lideran\xE7a do time de front-end na cria\xE7\xE3o de um novo projeto, atuando como desenvolvedor s\xEAnior com foco t\xE9cnico e arquitetural. Mentoria de novos colaboradores e condu\xE7\xE3o de palestras internas para capacita\xE7\xE3o do time no uso de tecnologias e boas pr\xE1ticas.',
		},
		{
			company: 'Tuxon',
			startedAt: 'FEV 2020',
			endedAt: 'NOV 2020',
			responsabilities: [
				'Manuten\xE7\xE3o nos sistemas existentes.',
				'Cria\xE7\xE3o de novas funcionalidades.',
				'Cria\xE7\xE3o de projetos do zero.',
			],
			softSkills: [
				'Capacidade de persuas\xE3o;',
				'Proatividade;',
				'Capacidade de trabalhar sob press\xE3o;',
				'Capacidade anal\xEDtica.',
			],
			hardSkills: ['Cursos t\xE9cnicos;', 'habilidades ligadas \xE0 inform\xE1tica.'],
			description:
				'Atua\xE7\xE3o na manuten\xE7\xE3o de sistemas existentes, desenvolvimento de novas funcionalidades e cria\xE7\xE3o de projetos do zero. Perfil proativo, com forte capacidade anal\xEDtica, habilidade para trabalhar sob press\xE3o e boa comunica\xE7\xE3o para alinhamento t\xE9cnico com o time.',
		},
		{
			company: '4You2 Idiomas',
			startedAt: 'ABR 2019',
			endedAt: 'SET 2019',
			responsabilities: [
				'Mentoriamento de novos colaboradores.',
				'Manuten\xE7\xE3o nos sistemas existentes.',
				'Cria\xE7\xE3o de novas funcionalidades.',
				'Cria\xE7\xE3o de projetos do zero.',
			],
			softSkills: [
				'Proatividade;',
				'Capacidade de trabalhar sob press\xE3o;',
				'Senso de lideran\xE7a;',
				'Capacidade anal\xEDtica;',
			],
			hardSkills: ['Conhecimento em uma l\xEDngua estrangeira;', 'Cursos t\xE9cnicos;'],
			description:
				'Atua\xE7\xE3o na manuten\xE7\xE3o e evolu\xE7\xE3o de sistemas existentes, desenvolvimento de novas funcionalidades e cria\xE7\xE3o de projetos do zero. Forte experi\xEAncia com ingl\xEAs no dia a dia, participando de dailies e alinhamentos t\xE9cnicos com falantes nativos, entendendo demandas diretamente com o time internacional e realizando implementa\xE7\xF5es e ajustes cont\xEDnuos. Atua\xE7\xE3o ativa no mentoriamento de novos colaboradores, apoiando onboarding, direcionamento t\xE9cnico e evolu\xE7\xE3o profissional, com perfil proativo, anal\xEDtico e senso de lideran\xE7a.',
		},
		{
			company: 'SPRO IT Solutions',
			startedAt: 'SET 2018',
			endedAt: 'ABR 2019',
			responsabilities: [
				'Manuten\xE7\xE3o nos sistemas existentes.',
				'Cria\xE7\xE3o de novas funcionalidades.',
				'Cria\xE7\xE3o de projetos do zero.',
			],
			softSkills: ['Proatividade;', 'Capacidade de trabalhar sob press\xE3o;', 'Capacidade anal\xEDtica;'],
			hardSkills: ['Cursos t\xE9cnicos;'],
			description:
				'Atua\xE7\xE3o na manuten\xE7\xE3o de sistemas existentes, desenvolvimento de novas funcionalidades e cria\xE7\xE3o de projetos do zero, com forte foco em automa\xE7\xE3o de processos. Mapeamento e entendimento de tarefas manuais que levavam dias ou semanas para serem executadas, criando automa\xE7\xF5es que passaram a realizar esses processos em segundos, acelerando significativamente o fluxo de trabalho e apoiando diretamente outras \xE1reas da empresa.',
		},
		{
			company: 'DevMaker',
			startedAt: 'OUT 2017',
			endedAt: 'SET 2018',
			responsabilities: [
				'Manuten\xE7\xE3o nos sistemas existentes.',
				'Cria\xE7\xE3o de novas funcionalidades.',
				'Cria\xE7\xE3o de projetos do zero.',
			],
			softSkills: ['Proatividade;', 'Capacidade de trabalhar sob press\xE3o;', 'Capacidade anal\xEDtica;'],
			hardSkills: ['Cursos t\xE9cnicos;'],
			description:
				'Apesar da posi\xE7\xE3o j\xFAnior, identifiquei a alta demanda de projetos e a dificuldade do time em manter o ritmo de entregas. Em alinhamento com o time de design, liderei a padroniza\xE7\xE3o dos componentes da empresa, criando varia\xE7\xF5es reutiliz\xE1veis aplicadas em todos os novos projetos. Para viabilizar essa iniciativa, estudei profundamente frameworks como Bootstrap, Material e Semantic UI, desenvolvendo uma solu\xE7\xE3o adaptada \xE0s necessidades da empresa, o que contribuiu para redu\xE7\xE3o de horas extras e trabalho aos fins de semana.',
		},
		{
			company: '01Tec',
			startedAt: 'ABR 2015',
			endedAt: 'SET 2016',
			responsabilities: ['Manuten\xE7\xE3o nos sistemas existentes.', 'Cria\xE7\xE3o de novas funcionalidades.'],
			softSkills: ['Proatividade;', 'Capacidade anal\xEDtica;'],
			hardSkills: ['Cursos t\xE9cnicos;'],
			description:
				'Experi\xEAncia de est\xE1gio onde iniciei com conhecimentos b\xE1sicos em l\xF3gica de programa\xE7\xE3o e evolu\xED para o desenvolvimento web completo, aprendendo HTML, CSS, JavaScript, jQuery, PHP e MySQL, al\xE9m da cria\xE7\xE3o de temas para WordPress. Ap\xF3s o per\xEDodo de est\xE1gio, atuei como freelancer para a empresa por alguns meses, contribuindo em projetos adicionais.',
		},
		{
			company: 'Servi\xE7os comunit\xE1rios',
			startedAt: 'ABR 2015',
			endedAt: 'SET 2016',
			responsabilities: [
				'Ensinar programa\xE7\xE3o (Projeto Lovelace)',
				'Fazer palestras.',
				'Distribuir cobertores.',
				'Distribuir alimentos.',
				'Dar aula de m\xFAsica.',
				'Auxiliar na mudan\xE7a das pessoas.',
				'M\xFAsica e Teatro ao ar livre.',
			],
			description:
				'Atua\xE7\xE3o em iniciativas comunit\xE1rias, incluindo ensino de programa\xE7\xE3o, realiza\xE7\xE3o de palestras educativas, distribui\xE7\xE3o de cobertores e alimentos para pessoas em situa\xE7\xE3o de vulnerabilidade, aulas de m\xFAsica, apoio em mudan\xE7as residenciais e participa\xE7\xE3o em apresenta\xE7\xF5es de m\xFAsica e teatro ao ar livre, contribuindo para educa\xE7\xE3o, cultura e apoio social.',
		},
	];
	static ɵfac = function (a) {
		return new (a || o)();
	};
	static ɵcmp = _({
		type: o,
		selectors: [['app-felipetiwamoto']],
		decls: 48,
		vars: 116,
		consts: [
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
		],
		template: function (a, s) {
			if (
				(a & 1 &&
					(l(0, 'div')(1, 'div')(2, 'div')(3, 'div')(4, 'div'),
					d(5, 'resume-hero01', 0),
					r(),
					l(6, 'div'),
					d(7, 'resume-contacts01', 1),
					r()(),
					l(8, 'div')(9, 'div')(10, 'div')(11, 'div'),
					d(12, 'i-lucide', 2),
					l(13, 'span'),
					m(14, 'EXPERI\xCANCIAS'),
					r()(),
					d(15, 'resume-experiences01', 3),
					r()(),
					l(16, 'div')(17, 'div')(18, 'div'),
					d(19, 'i-lucide', 4),
					l(20, 'span'),
					m(21, 'SOBRE MIM'),
					r()(),
					d(22, 'resume-about01', 5),
					r(),
					l(23, 'div')(24, 'div'),
					d(25, 'i-lucide', 6),
					l(26, 'span'),
					m(27, 'LINGUAGENS'),
					r()(),
					d(28, 'resume-skills01', 7),
					r(),
					l(29, 'div')(30, 'div'),
					d(31, 'i-lucide', 8),
					l(32, 'span'),
					m(33, 'CURSOS'),
					r()(),
					d(34, 'resume-courses01', 9),
					r(),
					l(35, 'div')(36, 'div'),
					d(37, 'i-lucide', 10),
					l(38, 'span'),
					m(39, 'HABILIDADES'),
					r()(),
					l(40, 'div')(41, 'span'),
					m(42, 'Frontend'),
					r(),
					d(43, 'resume-skills01', 7),
					r(),
					l(44, 'div')(45, 'span'),
					m(46, 'Backend'),
					r(),
					d(47, 'resume-skills01', 7),
					r()()()()()()()),
				a & 2)
			) {
				let n = 'resume';
				(i(n),
					e(),
					i(t('', n, '__page')),
					e(),
					i(t('', n, '__container')),
					e(),
					i(t('', n, '__top')),
					e(),
					i(t('', n, '__top_left')),
					e(),
					p('hero', s.hero),
					e(),
					i(t('', n, '__top_right')),
					e(),
					p('contacts', s.contacts),
					e(),
					i(t('', n, '__bottom')),
					e(),
					i(t('', n, '__bottom_left')),
					e(),
					i(t('', n, '__section')),
					e(),
					i(t('', n, '__section_title')),
					e(),
					i(t('', n, '__section_title_icon')),
					p('size', 24)('strokeWidth', 2),
					e(),
					i(t('', n, '__section_title_text')),
					e(2),
					p('experiences', s.experiences),
					e(),
					i(t('', n, '__bottom_right')),
					e(),
					i(t('', n, '__section')),
					e(),
					i(t('', n, '__section_title')),
					e(),
					i(t('', n, '__section_title_icon')),
					p('size', 24)('strokeWidth', 2),
					e(),
					i(t('', n, '__section_title_text')),
					e(2),
					p('about', s.about),
					e(),
					i(t('', n, '__section')),
					e(),
					i(t('', n, '__section_title')),
					e(),
					i(t('', n, '__section_title_icon')),
					p('size', 24)('strokeWidth', 2),
					e(),
					i(t('', n, '__section_title_text')),
					e(2),
					p('skills', s.languages),
					e(),
					i(t('', n, '__section')),
					e(),
					i(t('', n, '__section_title')),
					e(),
					i(t('', n, '__section_title_icon')),
					p('size', 24)('strokeWidth', 2),
					e(),
					i(t('', n, '__section_title_text')),
					e(2),
					p('courses', s.courses),
					e(),
					i(t('', n, '__section')),
					e(),
					i(t('', n, '__section_title')),
					e(),
					i(t('', n, '__section_title_icon')),
					p('size', 24)('strokeWidth', 2),
					e(),
					i(t('', n, '__section_title_text')),
					e(2),
					i(t('', n, '__sub_section')),
					e(),
					i(t('', n, '__section_sub_title')),
					e(2),
					p('skills', s.frontend),
					e(),
					i(t('', n, '__sub_section')),
					e(),
					i(t('', n, '__section_sub_title')),
					e(2),
					p('skills', s.backend));
			}
		},
		dependencies: [I, L, T, j, N, F, E, P],
		styles: [
			'.resume[_ngcontent-%COMP%]{--resume_right_side: 100%;padding:10px;background-color:var(--greye);display:flex;align-items:center;justify-content:center;flex-direction:initial}@media all and (min-width:768px){.resume[_ngcontent-%COMP%]{padding:50px 10px;--resume_right_side: 200px}}.resume__page[_ngcontent-%COMP%]{width:min(100%,25cm);min-height:33.7cm;padding:30px;box-sizing:border-box;background-color:var(--greyf)}@media all and (min-width:768px){.resume__page[_ngcontent-%COMP%]{padding:90px}}.resume__container[_ngcontent-%COMP%]{width:min(100% - 20px,768px);margin-inline:auto;position:relative}.resume__top[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;row-gap:30px}@media all and (min-width:768px){.resume__top[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 200px;column-gap:30px;row-gap:0px}}.resume__top_right[_ngcontent-%COMP%]{width:var(--resume_right_side)}.resume__bottom[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;row-gap:30px}@media all and (min-width:768px){.resume__bottom[_ngcontent-%COMP%]{grid-template-columns:1fr 200px;column-gap:30px;row-gap:0px}}.resume__bottom_right[_ngcontent-%COMP%]{width:var(--resume_right_side)}.resume__section[_ngcontent-%COMP%], .resume__sub_section[_ngcontent-%COMP%]{margin-top:30px}.resume__section_title[_ngcontent-%COMP%]{color:var(--resume01_primary);display:flex;align-items:center;justify-content:initial;flex-direction:initial;margin-bottom:30px}.resume__section_title[_ngcontent-%COMP%]   i-lucide[_ngcontent-%COMP%]{margin-right:10px}.resume__section_title_text[_ngcontent-%COMP%]{font-size:18px;font-weight:400;letter-spacing:initial;line-height:initial;display:block}.resume__section_sub_title[_ngcontent-%COMP%]{font-size:14px;font-weight:300;letter-spacing:initial;line-height:initial;margin-bottom:15px;display:block;color:var(--grey7)}',
		],
	});
};
export { G as FelipeTiwamoto };
