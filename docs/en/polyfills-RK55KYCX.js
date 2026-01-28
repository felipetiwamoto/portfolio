(function (o) {
	((o.ng ??= {}), (o.ng.common ??= {}), (o.ng.common.locales ??= {}));
	let e = void 0;
	function t(r) {
		let d = r,
			a = Math.floor(Math.abs(r)),
			n = r.toString().replace(/^[^.]*\.?/, '').length,
			i = parseInt(r.toString().replace(/^[^e]*(e([-+]?\d+))?/, '$2')) || 0;
		return a === Math.floor(a) && a >= 0 && a <= 1
			? 1
			: (i === 0 && a !== 0 && a % 1e6 === 0 && n === 0) || !(i >= 0 && i <= 5)
				? 4
				: 5;
	}
	o.ng.common.locales.pt = [
		'pt',
		[['AM', 'PM']],
		e,
		[
			['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
			['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 's\xE1b.'],
			['domingo', 'segunda-feira', 'ter\xE7a-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 's\xE1bado'],
			['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 's\xE1b.'],
		],
		e,
		[
			['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
			['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'],
			[
				'janeiro',
				'fevereiro',
				'mar\xE7o',
				'abril',
				'maio',
				'junho',
				'julho',
				'agosto',
				'setembro',
				'outubro',
				'novembro',
				'dezembro',
			],
		],
		e,
		[['a.C.', 'd.C.'], e, ['antes de Cristo', 'depois de Cristo']],
		0,
		[6, 0],
		['dd/MM/y', "d 'de' MMM 'de' y", "d 'de' MMMM 'de' y", "EEEE, d 'de' MMMM 'de' y"],
		['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
		['{1} {0}', e, e, e],
		[',', '.', ';', '%', '+', '-', 'E', '\xD7', '\u2030', '\u221E', 'NaN', ':'],
		['#,##0.###', '#,##0%', '\xA4\xA0#,##0.00', '#E0'],
		'BRL',
		'R$',
		'Real brasileiro',
		{
			AUD: ['AU$', '$'],
			BYN: [e, '\u0440.'],
			JPY: ['JP\xA5', '\xA5'],
			PHP: [e, '\u20B1'],
			PTE: ['Esc.'],
			RON: [e, 'L'],
			SYP: [e, 'S\xA3'],
			THB: ['\u0E3F'],
			TWD: ['NT$'],
			USD: ['US$', '$'],
		},
		'ltr',
		t,
		[
			[['meia-noite', 'meio-dia', 'da manh\xE3', 'da tarde', 'da noite', 'da madrugada'], e, e],
			[['meia-noite', 'meio-dia', 'manh\xE3', 'tarde', 'noite', 'madrugada'], e, e],
			['00:00', '12:00', ['06:00', '12:00'], ['12:00', '19:00'], ['19:00', '24:00'], ['00:00', '06:00']],
		],
	];
})(globalThis);
(globalThis.$localize ??= {}).locale = 'en'; /**i18n:8f4dc3acc5db079b18a61fcaf76ce5d3ab1ecd45730af0285c692a211a6b7b61*/
