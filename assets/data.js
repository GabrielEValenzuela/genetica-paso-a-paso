/* =========================================================
   Contenido de los problemas resueltos y del banco de preguntas.
   Notación: <sup>A</sup> para grupos sanguíneos y cromosoma X.
   ========================================================= */

const IA = 'I<sup>A</sup>', IB = 'I<sup>B</sup>';
const XL = 'X<sup>L</sup>', Xl = 'X<sup>l</sup>';

window.PROBLEMS = [
  {
    id: 'pulgar', title: 'El pulgar: Dd × Dd', level: 'Básico', tema: 'Monohíbrido',
    enunciado: 'La forma del pulgar depende de un gen: el alelo <b>D</b> (pulgar recto) domina sobre <b>d</b> (pulgar extensible, el que se dobla hacia atrás). Una pareja en la que ambos son <b>heterocigotas</b> tiene hijos. ¿Qué proporciones genotípicas y fenotípicas se esperan?',
    antes: 'Antes de abrir los pasos, escribí en tu hoja el genotipo de cada progenitor y tratá de armar el cuadro.',
    steps: [
      { t: 'Armo la leyenda', p: 'Lo primero que hago <em>siempre</em> es un mini diccionario: <code>D</code> = recto (dominante), <code>d</code> = extensible (recesivo).', w: 'Si no fijo qué significa cada letra, a mitad del ejercicio empiezo a confundir genotipo con fenotipo.', c: '¿Usé la misma letra para los dos alelos del mismo gen (D y d, no D y e)? Sí.' },
      { t: 'Traduzco el enunciado a genotipos', p: '"Heterocigota" significa dos alelos distintos: <code>Dd</code>. Los dos padres son <code>Dd</code>, y como tienen una D, los dos tienen pulgar recto.', w: 'El enunciado me regala el genotipo, no tengo que deducirlo.', c: 'En dominancia completa, un heterocigota siempre muestra el fenotipo dominante.' },
      { t: 'Separo los gametos (1ª ley)', p: 'Cada <code>Dd</code> forma dos tipos de gametos: la mitad lleva <code>D</code> y la otra mitad lleva <code>d</code>.', w: 'En la meiosis se separan los cromosomas homólogos, y con ellos se separan los alelos: cada gameto lleva <b>un solo</b> alelo de cada gen.', c: 'Si escribí un gameto con dos letras del mismo gen ("Dd"), me equivoqué.' },
      { t: 'Armo el cuadro de Punnett', p: 'Pongo los gametos de un progenitor arriba y los del otro a la izquierda, y combino cada fila con cada columna.', w: 'Cada casilla representa una fecundación igual de probable: 1/4 cada una.', c: 'Hay 4 casillas y cada una tiene exactamente 2 letras: una de arriba y una de la izquierda.',
        grid: { top: ['D', 'd'], left: ['D', 'd'], cells: [['DD', 'Dd'], ['Dd', 'dd']], ph: [['recto', 'recto'], ['recto', 'extensible']] } },
      { t: 'Cuento: primero genotipos, después fenotipos', p: 'Genotipos: <code>DD</code> aparece 1 vez, <code>Dd</code> 2 veces y <code>dd</code> 1 vez, o sea 1/4 : 2/4 : 1/4. Fenotipos: recto = DD + Dd = 3/4; extensible = dd = 1/4.', w: 'Cuento los genotipos primero porque los fenotipos salen de agruparlos.', c: '¿Las fracciones suman 4/4 = 100%? Sí ✔' }
    ],
    respuesta: '<b>Genotípico:</b> 25% DD (homocigota dominante), 50% Dd (heterocigota), 25% dd (homocigota recesivo) → <b>1:2:1</b>.<br><b>Fenotípico:</b> 75% pulgar recto, 25% pulgar extensible → <b>3:1</b>.<br>Guardate esta "firma": si ves 3:1 en los hijos, pensá en <code>Aa × Aa</code>.'
  },
  {
    id: 'ojos', title: 'Ojos claros y oscuros: ¿puede nacer un hijo de ojos claros?', level: 'Básico', tema: 'Monohíbrido · casos',
    enunciado: 'Ojos oscuros (<b>D</b>) domina sobre ojos claros (<b>d</b>). <br>a) ¿Qué descendencia tendrá una pareja en la que ambos tienen ojos claros? <br>b) ¿Puede una pareja formada por una persona de ojos claros y otra de ojos oscuros tener un hijo de ojos claros?',
    antes: 'Antes de abrir, pensá en la parte (b): ¿la persona de ojos oscuros tiene un único genotipo posible?',
    steps: [
      { t: 'Parte a: el recesivo me da el genotipo gratis', p: 'Ojos claros es el fenotipo recesivo, así que los dos padres son sí o sí <code>dd</code>.', w: 'Un rasgo recesivo solo se ve cuando no hay ningún alelo dominante que lo tape.', c: 'Fenotipo recesivo = genotipo seguro. Es la única certeza que te da un fenotipo.' },
      { t: 'Parte a: cruzo', p: 'En <code>dd × dd</code> todos los gametos llevan <code>d</code>, así que todas las casillas dan <code>dd</code>.', w: 'Si ninguno de los padres tiene D, es imposible que un hijo tenga D.', c: 'Resultado: 100% dd, 100% ojos claros.',
        grid: { top: ['d', 'd'], left: ['d', 'd'], cells: [['dd', 'dd'], ['dd', 'dd']], ph: [['claros', 'claros'], ['claros', 'claros']] } },
      { t: 'Parte b: el dominante me deja una duda', p: 'La persona de ojos claros es <code>dd</code>. La de ojos oscuros puede ser <code>DD</code> o <code>Dd</code>, así que la escribo <code>D_</code>.', w: 'Con el fenotipo dominante no sé si hay una segunda D o una d escondida.', c: 'Cuando no puedo decidir, analizo los dos casos por separado.' },
      { t: 'Caso 1: la persona de ojos oscuros es DD', p: 'Todos los hijos reciben D de un lado y d del otro: 100% <code>Dd</code>, ojos oscuros. No nace ningún hijo de ojos claros.', w: '', c: '',
        grid: { top: ['D', 'D'], left: ['d', 'd'], cells: [['Dd', 'Dd'], ['Dd', 'Dd']], ph: [['oscuros', 'oscuros'], ['oscuros', 'oscuros']] } },
      { t: 'Caso 2: la persona de ojos oscuros es Dd', p: 'La mitad de los hijos son <code>Dd</code> (ojos oscuros) y la otra mitad <code>dd</code> (ojos claros).', w: '', c: '',
        grid: { top: ['D', 'd'], left: ['d', 'd'], cells: [['Dd', 'dd'], ['Dd', 'dd']], ph: [['oscuros', 'claros'], ['oscuros', 'claros']] } },
      { t: 'Concluyo y respondo exactamente lo que me preguntaron', p: 'La pregunta era "¿puede?". Sí puede, siempre que la persona de ojos oscuros sea heterocigota (Dd). En ese caso, cada hijo tiene 50% de probabilidad de tener ojos claros.', w: 'Releer la pregunta al final evita contestar otra cosa.', c: '¿Respondí "sí/no" y lo justifiqué? Agregar el porcentaje suma.' }
    ],
    respuesta: 'a) 100% <code>dd</code>: todos con ojos claros.<br>b) <b>Sí</b>, si el progenitor de ojos oscuros es <code>Dd</code>: 50% Dd (oscuros) y 50% dd (claros). Si fuera DD, todos los hijos tendrían ojos oscuros.'
  },
  {
    id: 'drosophila', title: 'Moscas: de números reales a proporciones (78 y 23)', level: 'Intermedio', tema: 'Deducir a los padres',
    enunciado: 'En la mosca <i>Drosophila</i>, el cuerpo negro es recesivo respecto del color bronce. Un cruzamiento da <b>78 moscas bronce y 23 negras</b>. ¿Cuáles son los genotipos y fenotipos de los padres? ¿Qué gametos forman? ¿Qué proporciones genotípicas y fenotípicas se esperan en la descendencia?',
    antes: 'Antes de abrir, dividí 78 por 23. ¿A qué número entero simple se parece?',
    steps: [
      { t: 'Leyenda', p: '<code>N</code> = bronce (dominante), <code>n</code> = negro (recesivo).', w: 'El enunciado dice que el negro es recesivo, así que la minúscula es el negro.', c: '' },
      { t: 'Convierto los números en una proporción', p: 'Total: 78 + 23 = 101. 78/101 ≈ 77% y 23/101 ≈ 23%. Eso se parece mucho a 75% : 25%, o sea <b>3:1</b>.', w: 'Los datos reales nunca dan exactos porque la fecundación es azar. Busco la proporción "limpia" más cercana.', c: 'Atajo: mayor ÷ menor = 78 ÷ 23 ≈ 3,4, o sea ~3. Es un 3:1.' },
      { t: 'Razono qué padres pueden dar eso', p: 'Hay moscas negras (<code>nn</code>): cada una recibió una n de cada padre, así que <b>los dos</b> padres llevan n. Si uno fuera nn, el cruce Nn × nn daría 1:1, no 3:1. Entonces son <code>Nn × Nn</code> y los dos son bronce.', w: 'Pongo a prueba cada opción contra los datos, como un detective que va descartando sospechosos.', c: '¿Aparece algún hijo recesivo? Entonces ningún padre puede ser NN.' },
      { t: 'Gametos', p: 'Cada padre <code>Nn</code> forma gametos <code>N</code> y <code>n</code>, 50% de cada uno.', w: '', c: '' },
      { t: 'Cuadro y cuenta', p: 'Genotípico: 1/4 NN, 2/4 Nn, 1/4 nn. Fenotípico: 3/4 bronce, 1/4 negro.', w: '', c: 'Comparo con los datos: de 101 esperaría ~76 bronce y ~25 negras. Está muy cerca de 78 y 23 ✔. Que la teoría "se parezca" a los datos es la mejor señal de que razoné bien.',
        grid: { top: ['N', 'n'], left: ['N', 'n'], cells: [['NN', 'Nn'], ['Nn', 'nn']], ph: [['bronce', 'bronce'], ['bronce', 'negro']] } }
    ],
    respuesta: 'Padres: <code>Nn × Nn</code>, ambos de cuerpo bronce (heterocigotas). Gametos: N y n. Descendencia esperada: 25% NN, 50% Nn, 25% nn, que se ve como 75% bronce y 25% negro.'
  },
  {
    id: 'ratones', title: 'Ratones A y B: ¿quién es homocigota?', level: 'Intermedio', tema: 'Deducir dominancia · cruza de prueba',
    enunciado: 'Un ratón A de pelo blanco se cruza con uno de pelo negro y <b>toda</b> la descendencia es blanca. Otro ratón B, también blanco, se cruza con uno negro y nacen <b>5 blancos y 5 negros</b>. ¿Cuál de los dos es homocigota y cuál heterocigota?',
    antes: 'El enunciado NO dice qué color domina. ¿Podés deducirlo del primer cruce?',
    steps: [
      { t: 'Me doy cuenta de lo que falta', p: 'No me dicen quién domina. No es un descuido: es parte del ejercicio y tengo que deducirlo.', w: 'En los ejercicios que dicen "razoná", el dato que falta suele ser la clave.', c: '' },
      { t: 'Deduzco la dominancia', p: 'Blanco × negro da <b>todos</b> blancos: el negro "desapareció". Un alelo que desaparece cuando está el otro es recesivo. Entonces <code>B</code> = blanco (dominante) y <code>b</code> = negro (recesivo).', w: '', c: 'Los negros, por ser recesivos, son siempre <code>bb</code>.' },
      { t: 'Ratón A', p: '<code>BB × bb</code> da todos Bb, blancos. Si A fuera Bb, esperaría que la mitad saliera negra, y no salió ninguno. Entonces A es homocigota <code>BB</code>.', w: '', c: '',
        grid: { top: ['B', 'B'], left: ['b', 'b'], cells: [['Bb', 'Bb'], ['Bb', 'Bb']], ph: [['blanco', 'blanco'], ['blanco', 'blanco']] } },
      { t: 'Ratón B', p: '5 blancos y 5 negros es 1:1. Para que nazcan negros (bb), B tuvo que aportar una b: B es <code>Bb</code>. Y <code>Bb × bb</code> da justamente 1:1.', w: '', c: '',
        grid: { top: ['B', 'b'], left: ['b', 'b'], cells: [['Bb', 'bb'], ['Bb', 'bb']], ph: [['blanco', 'negro'], ['blanco', 'negro']] } },
      { t: 'Me doy cuenta de qué técnica usé', p: 'Sin proponérmelo, hice dos <b>cruzas de prueba</b>: crucé un dominante de genotipo dudoso con un homocigota recesivo. Esa es la técnica para averiguar si un dominante es homocigota o heterocigota.', w: '', c: 'Ojo: con pocos hijos, que salgan "todos dominantes" es una evidencia fuerte de homocigosis, pero no una prueba absoluta.' }
    ],
    respuesta: 'Domina el blanco. Ratón A = <code>BB</code> (homocigota); ratón B = <code>Bb</code> (heterocigota). Los ratones negros son <code>bb</code>.'
  },
  {
    id: 'cobaya', title: 'El cobaya blanco con padres negros', level: 'Intermedio', tema: 'Deducir genotipos con la familia',
    enunciado: 'Un cobaya de pelo blanco, cuyos padres son de pelo negro, se cruza con otro de pelo negro cuyos padres son uno negro y otro blanco. ¿Cuáles son los genotipos de los cobayas que se cruzan y de su descendencia?',
    antes: 'Dos padres negros tienen un hijo blanco. ¿Qué te dice eso sobre qué color es dominante?',
    steps: [
      { t: 'Dominancia: el hijo "sorpresa"', p: 'Dos negros tienen un hijo blanco: el blanco estaba escondido en los padres, y lo que se esconde es recesivo. <code>N</code> = negro (dominante), <code>n</code> = blanco (recesivo).', w: 'Regla de oro: si dos padres iguales tienen un hijo distinto, el fenotipo del hijo es el recesivo y los dos padres son heterocigotas.', c: '' },
      { t: 'Cobaya blanco', p: 'Tiene el fenotipo recesivo, así que es <code>nn</code>. (De paso: sus padres negros son <code>Nn</code>.)', w: '', c: '' },
      { t: 'Cobaya negro', p: 'Es <code>N_</code>. Uno de sus padres era blanco (nn) y le tuvo que pasar una n. Entonces es <code>Nn</code>.', w: 'Para completar el "_" de un dominante, miro a sus padres o a sus hijos.', c: '' },
      { t: 'Cruzo', p: '<code>Nn × nn</code>: la mitad Nn y la mitad nn.', w: '', c: '',
        grid: { top: ['N', 'n'], left: ['n', 'n'], cells: [['Nn', 'nn'], ['Nn', 'nn']], ph: [['negro', 'blanco'], ['negro', 'blanco']] } }
    ],
    respuesta: 'Se cruzan <code>nn</code> (blanco) × <code>Nn</code> (negro). Descendencia: 50% Nn (negro) y 50% nn (blanco).'
  },
  {
    id: 'huntington', title: 'Huntington: cuando el fenotipo todavía no habla', level: 'Intermedio', tema: 'Autosómica dominante · probabilidad',
    enunciado: 'La enfermedad de Huntington se debe a un alelo <b>autosómico dominante</b> (H) y suele aparecer entre los 35 y los 40 años. Un hombre de 20 años, sano por ahora, se entera de que su padre la desarrolló. Su padre es heterocigota (<code>Hh</code>) y su madre es sana (<code>hh</code>). <br>a) ¿Qué probabilidad tiene él de desarrollarla? <br>b) ¿Qué probabilidad tiene un hijo suyo de desarrollarla, si lo tiene con una mujer sana?',
    antes: 'Hay una trampa escondida: que él esté sano a los 20 años, ¿te dice algo sobre su genotipo?',
    steps: [
      { t: 'Desactivo la trampa', p: 'A los 20 años la enfermedad todavía no se manifiesta. Que hoy esté sano no dice nada sobre si tiene H: su fenotipo actual no me sirve.', w: 'El fenotipo puede depender de la edad y del ambiente. Fenotipo ≠ genotipo.', c: '' },
      { t: 'Parte a', p: 'Padre <code>Hh</code> × madre <code>hh</code>. Él tiene 1/2 de probabilidad de ser Hh (y desarrollar la enfermedad) y 1/2 de ser hh.', w: '', c: '',
        grid: { top: ['H', 'h'], left: ['h', 'h'], cells: [['Hh', 'hh'], ['Hh', 'hh']], ph: [['enfermo', 'sano'], ['enfermo', 'sano']] } },
      { t: 'Parte b: ¿qué supuesto uso?', p: 'Muchas resoluciones suponen que él es <code>Hh</code>, y entonces Hh × hh vuelve a dar <b>50%</b>. Pero si quiero ser preciso, todavía no sé si él tiene H, así que hay que encadenar dos probabilidades: P(él es Hh) × P(le pasa H al hijo) = 1/2 × 1/2 = <b>1/4</b>.', w: 'Cuando un resultado depende de algo incierto, multiplico las probabilidades (regla del producto: "esto Y aquello").', c: 'Al responder, escribí tu supuesto: "Si él es Hh, la probabilidad es 50%". Así te corrigen bien con cualquiera de las dos lecturas.' }
    ],
    respuesta: 'a) <b>50%</b>.<br>b) Si él es Hh: <b>50%</b> (la respuesta más habitual). Sin saber su genotipo: 1/2 × 1/2 = 25%.'
  },
  {
    id: 'abo0ab', title: 'Grupo 0 × grupo AB: ¿pueden tener hijos 0 o AB?', level: 'Básico', tema: 'Grupos sanguíneos ABO',
    enunciado: `Un hombre de grupo 0 y una mujer de grupo AB tienen hijos. ¿Cómo podrán ser? (${IA} e ${IB} son codominantes y ambos dominan sobre i.)`,
    antes: 'Predicción rápida: ¿pueden tener un hijo de grupo 0? ¿Y uno AB? Anotá lo que creés y después controlá.',
    steps: [
      { t: 'Genotipos seguros', p: `Grupo 0 solo puede ser <code>ii</code> (es el recesivo). Grupo AB solo puede ser <code>${IA}${IB}</code> (necesita los dos alelos). Ambos genotipos son seguros, así que no hay casos que analizar.`, w: '', c: 'En notación simplificada: 00 y AB.' },
      { t: 'Gametos', p: `Él solo forma gametos <code>i</code>. Ella forma <code>${IA}</code> o <code>${IB}</code>.`, w: '', c: '' },
      { t: 'Cuadro', p: 'La mitad de los hijos es grupo A y la otra mitad grupo B.', w: '', c: '',
        grid: { top: [IA, IB], left: ['i', 'i'], cells: [[IA + 'i', IB + 'i'], [IA + 'i', IB + 'i']], ph: [['A', 'B'], ['A', 'B']] } },
      { t: 'Comparo con mi predicción', p: 'No nace ningún hijo 0, porque siempre reciben un I<sup>A</sup> o un I<sup>B</sup> de la madre. Y no nace ningún hijo AB, porque el padre no tiene ni A ni B para dar. Los hijos "no se parecen" a ninguno de los padres.', w: 'Comparar con lo que había predicho es metacognición pura: si algo me sorprende, lo entiendo mejor y lo recuerdo más.', c: '' }
    ],
    respuesta: `100% heterocigotas: 50% <code>${IA}i</code> (grupo A) y 50% <code>${IB}i</code> (grupo B). 0% grupo 0 y 0% grupo AB.`
  },
  {
    id: 'paternidad', title: 'Juicio de paternidad: dos candidatos', level: 'Intermedio', tema: 'Grupos sanguíneos ABO',
    enunciado: 'Un niño es de grupo <b>0</b>. La madre es de grupo <b>A</b>. El posible padre 1 es de grupo <b>B</b> y el posible padre 2 es de grupo <b>AB</b>. ¿Sirve esta información para descartar a alguno? Proponé los genotipos.',
    antes: 'Empezá por la persona cuyo genotipo es seguro. ¿Quién es?',
    steps: [
      { t: 'Arranco por lo seguro: el niño', p: 'Grupo 0 → <code>ii</code>. Recibió una i de la madre y una i del padre biológico.', w: 'Siempre empiezo por el individuo de genotipo seguro y desde ahí "contagio" información a los demás.', c: '' },
      { t: 'La madre', p: `Es grupo A, así que podría ser ${IA}${IA} o ${IA}i. Pero le dio una i al niño, entonces es <code>${IA}i</code>.`, w: '', c: '' },
      { t: 'Padre 2 (AB)', p: `Es <code>${IA}${IB}</code>: no tiene ninguna i para dar. Todos sus hijos recibirían I<sup>A</sup> o I<sup>B</sup> y nunca podrían ser 0. <b>Queda excluido.</b>`, w: '', c: '' },
      { t: 'Padre 1 (B)', p: `Puede ser ${IB}${IB} o ${IB}i. Si es <code>${IB}i</code>, puede darle una i al niño, así que <b>no puede descartarse</b>.`, w: '', c: '',
        grid: { top: [IA, 'i'], left: [IB, 'i'], cells: [[IA + IB, IB + 'i'], [IA + 'i', 'ii']], ph: [['AB', 'B'], ['A', '0']] } },
      { t: 'Cuido la conclusión', p: 'No digo "el padre 1 <b>es</b> el padre". Digo "el padre 1 <b>puede</b> serlo y el padre 2 <b>no puede</b>".', w: 'Los grupos sanguíneos pueden <b>excluir</b>, nunca <b>confirmar</b>: hay muchísimos hombres I<sup>B</sup>i o I<sup>A</sup>i que también podrían ser el padre.', c: 'Esta frase sola suele sumar puntos en una pregunta teórica.' }
    ],
    respuesta: `Niño <code>ii</code>; madre <code>${IA}i</code>; padre 1 <code>${IB}i</code> (compatible); padre 2 <code>${IA}${IB}</code> (excluido). El ABO descarta al padre 2, pero no confirma al padre 1.`
  },
  {
    id: 'familia', title: 'Una familia de cinco hijos (A × B)', level: 'Intermedio', tema: 'Grupos sanguíneos ABO',
    enunciado: 'Un hombre de grupo A y una mujer de grupo B tienen cinco hijos: uno AB, dos A y dos 0. Señalá el genotipo de toda la familia.',
    antes: '¿Qué hijo te da la pista más fuerte sobre los padres?',
    steps: [
      { t: 'La pista más fuerte: los hijos 0', p: `Un hijo 0 es <code>ii</code> y recibió una i de cada progenitor. Entonces el padre (A) es <code>${IA}i</code> y la madre (B) es <code>${IB}i</code>.`, w: 'El recesivo vuelve a ser la llave: me da genotipos seguros "hacia arriba", en los padres.', c: '' },
      { t: 'Cuadro', p: 'Cada grupo tiene 1/4 de probabilidad.', w: '', c: '',
        grid: { top: [IB, 'i'], left: [IA, 'i'], cells: [[IA + IB, IA + 'i'], [IB + 'i', 'ii']], ph: [['AB', 'A'], ['B', '0']] } },
      { t: 'Genotipos de los hijos', p: `AB → ${IA}${IB}. A → ${IA}i (no pueden ser ${IA}${IA} porque la madre no tiene I<sup>A</sup>). 0 → ii.`, w: '', c: '' },
      { t: 'Un detalle que confunde', p: 'El cuadro dice 1/4 de cada grupo, pero en esta familia no nació ningún hijo B y hubo dos A y dos 0. ¿Está mal? No: las proporciones son <b>probabilidades para cada embarazo</b>, no un reparto garantizado. Con 5 hijos, el azar manda.', w: '', c: 'Si la realidad no coincide exacto con el Punnett, eso no significa que me equivoqué.' }
    ],
    respuesta: `Padre <code>${IA}i</code>; madre <code>${IB}i</code>; hijo AB <code>${IA}${IB}</code>; hijos A <code>${IA}i</code>; hijos 0 <code>ii</code>.`
  },
  {
    id: 'dihibrido', title: 'Dos caracteres a la vez: aniridia y jaqueca', level: 'Desafío', tema: 'Dihíbrido · 2ª ley',
    enunciado: 'La aniridia se debe a un alelo dominante (<b>A</b>) y la jaqueca a otro dominante (<b>J</b>), en cromosomas distintos. Un hombre con aniridia, cuya madre no la tenía, se casa con una mujer con jaqueca, cuyo padre no la tenía. Él no tiene jaqueca y ella no tiene aniridia. ¿Qué proporción de sus hijos tendrá ambos males?',
    antes: 'Truco: no hagas un cuadro de 16 casillas. Resolvé cada gen por separado y después combiná.',
    steps: [
      { t: 'Genotipo del hombre', p: 'Tiene aniridia (A_) y su madre no la tenía (aa), así que ella le dio una a: es Aa. No tiene jaqueca, así que es jj. Él: <code>Aajj</code>.', w: '', c: '' },
      { t: 'Genotipo de la mujer', p: 'Tiene jaqueca (J_) y su padre no la tenía (jj), así que es Jj. No tiene aniridia, así que es aa. Ella: <code>aaJj</code>.', w: '', c: '' },
      { t: 'Gen por gen', p: 'Aniridia: Aa × aa → 1/2 con aniridia. Jaqueca: jj × Jj → 1/2 con jaqueca.', w: 'La 2ª ley dice que estos genes se heredan de forma independiente: los puedo tratar como dos monedas separadas.', c: '' },
      { t: 'Combino con la regla del producto', p: 'Ambos males = aniridia <b>Y</b> jaqueca → 1/2 × 1/2 = <b>1/4</b>.', w: '', c: 'Lo verifico con el cuadro de gametos: él forma Aj o aj; ella forma aJ o aj. Los dos métodos coinciden ✔',
        grid: { top: ['aJ', 'aj'], left: ['Aj', 'aj'], cells: [['AaJj', 'Aajj'], ['aaJj', 'aajj']], ph: [['ambos', 'aniridia'], ['jaqueca', 'sano']] } }
    ],
    respuesta: '<b>1/4 (25%)</b> de los hijos tendrá aniridia y jaqueca (<code>AaJj</code>).'
  },
  {
    id: 'naranjas', title: 'Flores naranjas: cuando nadie domina', level: 'Intermedio', tema: 'Dominancia incompleta',
    enunciado: 'Al cruzar dos plantas de flores naranjas nacen <b>30 rojas, 60 naranjas y 30 amarillas</b>. ¿Qué descendencia dará cruzar las naranjas con las rojas? ¿Y las naranjas con las amarillas?',
    antes: '30 : 60 : 30 no es 3:1. ¿Qué proporción es? ¿Qué te está diciendo?',
    steps: [
      { t: 'Leo la proporción', p: '30:60:30 = 1:2:1, y son <b>tres</b> fenotipos. En dominancia completa hay solo dos fenotipos (3:1). Tres fenotipos en 1:2:1 delatan que el heterocigota tiene un fenotipo propio.', w: 'En la dominancia incompleta, la proporción fenotípica es igual a la genotípica.', c: '' },
      { t: 'Leyenda', p: '<code>R</code> = rojo, <code>A</code> = amarillo, sin minúsculas porque ninguno domina. RR rojo, AA amarillo, RA naranja (intermedio).', w: '', c: 'Algunos ejercicios lo llaman "codominancia". Cuando el heterocigota es un intermedio (una mezcla), el nombre técnico es dominancia incompleta. Las cuentas son idénticas.' },
      { t: 'Naranja × roja', p: '1/2 rojas, 1/2 naranjas.', w: '', c: '',
        grid: { top: ['R', 'A'], left: ['R', 'R'], cells: [['RR', 'RA'], ['RR', 'RA']], ph: [['roja', 'naranja'], ['roja', 'naranja']] } },
      { t: 'Naranja × amarilla', p: '1/2 naranjas, 1/2 amarillas.', w: '', c: '',
        grid: { top: ['R', 'A'], left: ['A', 'A'], cells: [['RA', 'AA'], ['RA', 'AA']], ph: [['naranja', 'amarilla'], ['naranja', 'amarilla']] } }
    ],
    respuesta: 'Naranja × naranja: 1 roja : 2 naranjas : 1 amarilla. Naranja × roja: 1/2 rojas y 1/2 naranjas. Naranja × amarilla: 1/2 naranjas y 1/2 amarillas.'
  },
  {
    id: 'letalx', title: 'Un alelo letal en el cromosoma X', level: 'Desafío', tema: 'Herencia ligada al X',
    enunciado: 'Una mujer lleva en uno de sus cromosomas X un alelo letal recesivo (<b>l</b>) y en el otro el alelo normal (<b>L</b>). Tiene hijos con un hombre normal. ¿Cuál será la proporción de sexos entre los hijos que nacen?',
    antes: 'Los varones tienen un solo cromosoma X. ¿Qué le pasa a un varón que recibe la X con el alelo l?',
    steps: [
      { t: 'Escribo los cromosomas sexuales con el alelo', p: `Mujer: <code>${XL}${Xl}</code> (portadora). Hombre: <code>${XL}Y</code>.`, w: 'En los genes ligados al X escribo el alelo pegado a la X; el cromosoma Y no lleva ese gen.', c: '' },
      { t: 'Cuadro', p: '', w: '', c: '',
        grid: { top: [XL, Xl], left: [XL, 'Y'], cells: [[XL + XL, XL + Xl], [XL + 'Y', Xl + 'Y']], ph: [['mujer', 'mujer portadora'], ['varón', '✝ no nace']] } },
      { t: 'Pienso en los varones', p: `Un varón <code>${Xl}Y</code> no tiene otro X que "tape" al alelo letal: se expresa y no llega a nacer. Las mujeres siempre reciben un ${XL} del padre.`, w: '', c: '' },
      { t: 'Cuento solo a los que nacen', p: 'De las 4 casillas, 1 no nace. Quedan 3: 2 mujeres y 1 varón, o sea <b>2:1</b>.', w: '', c: 'Cuando hay letales cambia el total: el denominador son los que nacen, no las 4 casillas.' }
    ],
    respuesta: '<b>2 mujeres : 1 varón</b> (≈ 67% mujeres y 33% varones).'
  },
  {
    id: 'calvicie', title: 'Calvicie: un gen autosómico que cambia según el sexo', level: 'Desafío', tema: 'Herencia influida por el sexo',
    enunciado: 'La calvicie es un carácter <b>influido por el sexo</b>: el alelo C (calvicie) es dominante en los varones y recesivo en las mujeres (N = no calvicie). Un hombre calvo, cuyo padre no era calvo, se casa con una mujer no calva cuya madre sí era calva. ¿Cuáles son los genotipos? ¿Cómo será la descendencia?',
    antes: 'Armate una tablita: ¿qué genotipos son calvos en los varones y cuáles en las mujeres?',
    steps: [
      { t: 'Tabla de traducción', p: 'Varones: CC y CN son calvos, NN no es calvo. Mujeres: solo CC es calva; CN y NN no son calvas.', w: 'El gen es autosómico (todos tienen dos copias), pero las hormonas cambian cuál alelo domina.', c: '' },
      { t: 'El hombre', p: 'Es calvo (C_). Su padre no era calvo, y un varón no calvo es NN, así que le pasó una N. Él es <code>CN</code>.', w: '', c: '' },
      { t: 'La mujer', p: 'Su madre era calva, y una mujer calva es CC, así que le pasó una C. Ella no es calva, por lo tanto no es CC: es <code>CN</code>.', w: '', c: '' },
      { t: 'Cuadro', p: '', w: '', c: '',
        grid: { top: ['C', 'N'], left: ['C', 'N'], cells: [['CC', 'CN'], ['CN', 'NN']], ph: [['♂ calvo · ♀ calva', '♂ calvo · ♀ no'], ['♂ calvo · ♀ no', 'nadie calvo']] } },
      { t: 'Separo por sexo', p: 'Hijos varones: CC + CN = <b>3/4 calvos</b>. Hijas: solo CC = <b>1/4 calvas</b>.', w: '', c: 'No lo confundas con la herencia "ligada al sexo": acá el gen NO está en el cromosoma X.' }
    ],
    respuesta: 'Hombre <code>CN</code>, mujer <code>CN</code>. Hijos varones: 3/4 calvos. Hijas: 1/4 calvas.'
  }
];

/* =========================================================
   Banco de preguntas
   tipo: 'teoria' | 'ejercicio'
   a: índice de la opción correcta
   ========================================================= */
window.QUESTIONS = [
  // ---------- Ciclo celular ----------
  { id: 't1', tipo: 'teoria', tema: 'Ciclo celular', q: '¿En qué etapa del ciclo celular se duplica (replica) el ADN?',
    opts: ['G1', 'S', 'G2', 'Durante la mitosis'], a: 1,
    exp: 'La "S" es de <b>síntesis</b> de ADN y pertenece a la interfase. Una trampa muy común es pensar que el ADN se copia durante la mitosis: cuando la célula entra en mitosis, el ADN <b>ya</b> está duplicado.' },
  { id: 't2', tipo: 'teoria', tema: 'Ciclo celular', q: 'Una célula humana (46 cromosomas) hace mitosis. ¿Qué se obtiene?',
    opts: ['2 células con 46 cromosomas, genéticamente idénticas', '2 células con 23 cromosomas', '4 células con 23 cromosomas, genéticamente distintas', '4 células con 46 cromosomas'], a: 0,
    exp: 'La mitosis "fotocopia": 1 célula da <b>2 células idénticas</b> con el mismo número de cromosomas (2n = 46). La opción de 4 células con 23 describe la <b>meiosis</b>.' },
  { id: 't3', tipo: 'teoria', tema: 'Ciclo celular', q: '¿Qué resultado produce la meiosis en los seres humanos?',
    opts: ['2 células diploides idénticas', '4 células haploides (n = 23) genéticamente distintas', '4 células diploides idénticas', '2 células haploides idénticas'], a: 1,
    exp: 'Una replicación y dos divisiones: <b>4 células haploides</b>. Son distintas entre sí por el crossing-over (profase I) y por la distribución al azar de los homólogos (metafase I).' },
  { id: 't4', tipo: 'teoria', tema: 'Mendel y meiosis', q: '¿En qué células y en qué momento se cumple la 1ª ley de Mendel (segregación)?',
    opts: ['En células somáticas, durante la anafase de la mitosis', 'En las células germinales, durante la meiosis (anafase I, al separarse los homólogos)', 'En cualquier célula, durante la fase S', 'En el cigoto, durante la fecundación'], a: 1,
    exp: 'Los dos alelos de un gen están en cromosomas homólogos. Cuando en la <b>anafase I</b> los homólogos se van a polos opuestos, los alelos se separan y cada gameto termina llevando uno solo. Esto ocurre en las células de la línea germinal (en ovarios y testículos).' },
  { id: 't5', tipo: 'teoria', tema: 'Mendel y meiosis', q: '¿Qué proceso explica la 2ª ley de Mendel (distribución independiente)?',
    opts: ['La replicación semiconservativa del ADN', 'La citocinesis', 'La orientación al azar de cada par de homólogos en la metafase I de la meiosis', 'La separación de cromátidas hermanas en la mitosis'], a: 2,
    exp: 'En la metafase I cada par de homólogos se ubica en el ecuador "mirando" para un lado u otro al azar, sin importar cómo se ubiquen los demás pares. Por eso los genes que están en cromosomas distintos se reparten de forma independiente.' },
  { id: 't6', tipo: 'teoria', tema: 'Ciclo celular', q: 'Una neurona madura que ya no se divide se encuentra en…',
    opts: ['Fase S permanente', 'G0', 'Metafase', 'G2'], a: 1,
    exp: '<b>G0</b> es la "salida lateral" del ciclo: la célula sigue viva y trabajando, pero no se prepara para dividirse. La mayoría de las neuronas maduras están en G0.' },
  { id: 't7', tipo: 'teoria', tema: 'Ciclo celular', q: 'Completá el cuadro: la mitosis ocurre en ___ y su función es ___.',
    opts: ['células germinales · formar gametos', 'células somáticas · crecimiento, reparación y reemplazo de tejidos', 'solo en el cigoto · fecundación', 'células somáticas · generar variabilidad genética'], a: 1,
    exp: 'Mitosis = células del cuerpo (somáticas): sirve para crecer, reparar y reponer células. La variabilidad y los gametos son "el trabajo" de la meiosis.' },

  // ---------- Cromosoma y ADN ----------
  { id: 't8', tipo: 'teoria', tema: 'Cromosoma', q: 'Las dos cromátidas hermanas de un cromosoma duplicado son…',
    opts: ['Un cromosoma de la madre y uno del padre', 'Copias idénticas producidas durante la fase S, unidas por el centrómero', 'Dos cromosomas de pares distintos', 'Los brazos p y q del cromosoma'], a: 1,
    exp: 'Las cromátidas hermanas son <b>copias idénticas</b> (salvo crossing-over). No hay que confundirlas con los <b>homólogos</b>, que son uno materno y uno paterno y pueden llevar alelos distintos.' },
  { id: 't9', tipo: 'teoria', tema: 'Cromosoma', q: '¿Cómo está formado el cariotipo humano normal?',
    opts: ['23 cromosomas, todos autosomas', '22 pares de autosomas + 1 par de cromosomas sexuales (46 en total)', '46 pares de cromosomas', '23 pares de cromosomas sexuales'], a: 1,
    exp: '46 cromosomas = 23 pares: 22 pares de autosomas + el par sexual (XX o XY). Las células somáticas son diploides (2n = 46) y los gametos haploides (n = 23).' },
  { id: 't10', tipo: 'teoria', tema: 'ADN', q: '¿Por qué se dice que la replicación del ADN es semiconservativa?',
    opts: ['Porque solo se copia la mitad de los genes', 'Porque cada molécula nueva conserva una hebra original y tiene una hebra nueva', 'Porque se pierde la mitad del ADN en cada división', 'Porque se copia solo en la mitad de las células'], a: 1,
    exp: 'La doble hélice se abre y cada hebra sirve de molde. Cada molécula hija queda formada por <b>una hebra vieja + una nueva</b>.' },
  { id: 't11', tipo: 'teoria', tema: 'ADN', q: 'En el ADN, las bases complementarias se aparean así:',
    opts: ['A–G y C–T', 'A–T y C–G', 'A–U y C–G', 'A–C y G–T'], a: 1,
    exp: 'En el ADN: <b>A con T</b> y <b>C con G</b>. El uracilo (U) aparece en el ARN, donde reemplaza a la T.' },
  { id: 't12', tipo: 'teoria', tema: 'ADN', q: 'En el código genético, un codón es…',
    opts: ['Un gen completo', 'Una secuencia de 3 nucleótidos del ARNm que especifica un aminoácido (o una señal de inicio o fin)', 'Una proteína', 'Un par de bases'], a: 1,
    exp: 'El código se lee de a <b>tripletes</b> (codones). Hay 64 codones para 20 aminoácidos, por eso el código es redundante (varios codones para un mismo aminoácido). AUG es el codón de inicio.' },
  { id: 't13', tipo: 'teoria', tema: 'Alteraciones', q: 'Una "trisomía" es…',
    opts: ['La pérdida de un segmento cromosómico', 'La presencia de un cromosoma extra en un par de homólogos (3 en vez de 2)', 'La rotación de 180° de un fragmento', 'La ausencia de un cromosoma del par'], a: 1,
    exp: 'Tri = tres. Ejemplo: el síndrome de Down es una trisomía del cromosoma 21.' },
  { id: 't14', tipo: 'teoria', tema: 'Alteraciones', q: 'Una "translocación" es…',
    opts: ['Un intercambio de fragmentos entre cromosomas NO homólogos', 'La repetición de un fragmento de ADN', 'Un cromosoma extra', 'La rotación de 180° de un segmento'], a: 0,
    exp: 'Trans-locación = "cambio de lugar": un pedazo pasa a un cromosoma <b>no homólogo</b>. Si el intercambio fuera entre homólogos, sería un crossing-over normal.' },
  { id: 't15', tipo: 'teoria', tema: 'Alteraciones', q: 'Una "inversión" es…',
    opts: ['La pérdida de un segmento', 'La rotación de 180° de una parte del cromosoma', 'Un cromosoma extra', 'La duplicación de un gen'], a: 1,
    exp: 'El segmento se corta, gira 180° y se vuelve a pegar: los genes quedan en orden invertido.' },
  { id: 't16', tipo: 'teoria', tema: 'Alteraciones', q: '¿Qué par está bien relacionado?',
    opts: ['Deleción → repetición anormal de un fragmento', 'Duplicación → pérdida de un segmento', 'Deleción → pérdida de un segmento; Duplicación → repetición de un fragmento', 'Nulisomía → cromosoma extra'], a: 2,
    exp: '<b>Deleción</b> = se borra un pedazo (como "delete"). <b>Duplicación</b> = un pedazo aparece repetido. Monosomía es que falte uno del par; nulisomía, que falten los dos.' },

  // ---------- Vocabulario ----------
  { id: 't17', tipo: 'teoria', tema: 'Vocabulario', q: '¿Qué son los cromosomas homólogos?',
    opts: ['Dos copias idénticas de un cromosoma', 'Un par de cromosomas (uno materno y uno paterno) del mismo tamaño y forma, con los mismos genes en los mismos loci, aunque pueden llevar alelos distintos', 'Cromosomas de pares distintos con genes distintos', 'Los cromosomas X e Y en las mujeres'], a: 1,
    exp: 'Homólogo = "misma información". Llevan los <b>mismos genes</b>, pero no necesariamente los <b>mismos alelos</b> (uno puede tener D y el otro d). Los de pares distintos son heterólogos (no homólogos).' },
  { id: 't18', tipo: 'teoria', tema: 'Vocabulario', q: '¿Cuál de estos pares de cromosomas es heterólogo?',
    opts: ['El cromosoma 7 materno y el 7 paterno', 'El cromosoma 1 y el cromosoma 4', 'Las dos cromátidas del cromosoma 3', 'Los dos X de una mujer'], a: 1,
    exp: 'Heterólogos (no homólogos) son cromosomas de <b>pares distintos</b>: distinto tamaño, distintos genes. El 1 y el 4 no comparten genes.' },
  { id: 't19', tipo: 'teoria', tema: 'Vocabulario', q: 'El "locus" de un gen es…',
    opts: ['Una variante del gen', 'El lugar fijo que ocupa el gen en el cromosoma', 'El conjunto de alelos de un individuo', 'El fenotipo que produce'], a: 1,
    exp: 'Locus (plural: <b>loci</b>) = la "dirección" del gen. Los alelos de un gen ocupan el mismo locus en los dos cromosomas homólogos.' },
  { id: 't20', tipo: 'teoria', tema: 'Vocabulario', q: 'Un alelo es…',
    opts: ['Cada una de las variantes o alternativas de un gen', 'Un cromosoma completo', 'Un par de cromosomas', 'El fenotipo dominante'], a: 0,
    exp: 'Definición: "cada una de las alternativas o variantes de un gen". Ej.: el gen "forma del pulgar" tiene los alelos D (recto) y d (extensible).' },
  { id: 't21', tipo: 'teoria', tema: 'Vocabulario', q: '¿Qué es el fenotipo?',
    opts: ['La combinación de alelos de un individuo', 'Las características observables o medibles, que resultan de la interacción entre el genotipo y el ambiente', 'Solo los rasgos visibles a simple vista', 'El alelo dominante'], a: 1,
    exp: '<b>Fenotipo = genotipo + ambiente.</b> Incluye rasgos que no se ven a simple vista, como el grupo sanguíneo. La combinación de alelos es el genotipo.' },
  { id: 't22', tipo: 'teoria', tema: 'Vocabulario', q: 'Si fuera posible clonar a un ser humano, el clon y el original tendrían…',
    opts: ['Idéntico genotipo e idéntico fenotipo', 'Idéntico genotipo, pero su fenotipo podría diferir por la influencia del ambiente', 'Distinto genotipo e idéntico fenotipo', 'Nada en común'], a: 1,
    exp: 'Mismo ADN no significa misma persona: la nutrición, las experiencias, el aprendizaje y la regulación de los genes moldean el fenotipo (pensá en los gemelos idénticos, que son clones naturales y aun así son distintos).' },
  { id: 't23', tipo: 'teoria', tema: 'Vocabulario', q: 'Un rasgo recesivo…',
    opts: ['Es siempre el menos frecuente en la población', 'Solo se manifiesta en homocigosis (dos copias del alelo recesivo)', 'Desaparece después de una generación', 'Es siempre una enfermedad'], a: 1,
    exp: 'Recesivo habla de <b>expresión</b>, no de frecuencia. Hay alelos dominantes rarísimos (como el de Huntington) y recesivos muy comunes (como el de grupo 0).' },
  { id: 't24', tipo: 'teoria', tema: 'Vocabulario', q: 'Un individuo de genotipo Dd es…',
    opts: ['Homocigota dominante', 'Homocigota recesivo', 'Heterocigota', 'Haploide'], a: 2,
    exp: 'Hetero = distinto: tiene dos alelos <b>distintos</b>. DD es homocigota dominante y dd es homocigota recesivo.' },
  { id: 't25', tipo: 'teoria', tema: 'Vocabulario', q: '¿Cuántos tipos de gametos forman un homocigota dominante (AA), un homocigota recesivo (aa) y un heterocigota (Aa)?',
    opts: ['1, 1 y 2', '2, 2 y 2', '1, 1 y 1', '2, 1 y 4'], a: 0,
    exp: 'AA solo puede dar A, aa solo puede dar a: un tipo cada uno. Aa da A o a: dos tipos. ' },

  // ---------- Mendel ----------
  { id: 't26', tipo: 'teoria', tema: 'Mendel', q: '¿Qué establece la 1ª ley de Mendel (principio de segregación)?',
    opts: ['Que los rasgos se mezclan en los hijos', 'Que cada individuo tiene un par de alelos para cada carácter y que estos se separan al formar los gametos, de modo que cada gameto lleva uno solo', 'Que los genes de distintos caracteres se heredan juntos', 'Que el heterocigota tiene un fenotipo intermedio'], a: 1,
    exp: 'Segregar = separar. Los alelos <b>no se mezclan</b>: se separan y cada gameto lleva uno.' },
  { id: 't27', tipo: 'teoria', tema: 'Mendel', q: '¿Qué establece la 2ª ley de Mendel (distribución independiente)?',
    opts: ['Que los alelos de un mismo gen se separan', 'Que los alelos de genes distintos (en cromosomas distintos) se reparten en los gametos de forma independiente entre sí', 'Que todos los hijos de la F1 son iguales', 'Que el alelo dominante es el más frecuente'], a: 1,
    exp: 'Heredar el color de la semilla no condiciona la forma de la semilla. Por eso un dihíbrido AaBb forma 4 tipos de gametos (AB, Ab, aB, ab) en igual proporción. Ojo: no se cumple para genes que están juntos en el mismo cromosoma (ligados).' },
  { id: 't28', tipo: 'teoria', tema: 'Mendel', q: 'El principio de uniformidad dice que al cruzar dos líneas puras (AA × aa)…',
    opts: ['La F1 sale 3:1', 'Toda la F1 es igual: heterocigota (Aa) y con el fenotipo dominante', 'La F1 sale 1:2:1', 'La F1 es igual a la línea pura recesiva'], a: 1,
    exp: 'Todos los hijos reciben A de un lado y a del otro → 100% Aa, todos con el fenotipo dominante. Esto pasa sin importar cuál de los padres aporta cada alelo.' },
  { id: 't29', tipo: 'teoria', tema: 'Mendel', q: 'Mendel obtenía líneas puras por autofecundación durante varias generaciones. ¿Es eso una clonación?',
    opts: ['Sí, porque los hijos son iguales a los padres', 'No: es reproducción sexual (hay meiosis, gametos y fecundación); los hijos salen iguales solo porque los padres son homocigotas', 'Sí, porque hay una sola planta', 'No, porque las plantas no tienen ADN'], a: 1,
    exp: 'La clonación es reproducción <b>asexual</b>: una copia genética sin fecundación (como un gajo o esqueje). En la autofecundación hay gametos masculinos y femeninos que se unen; los hijos salen iguales porque una planta AA solo puede dar gametos A.' },
  { id: 't30', tipo: 'teoria', tema: 'Mendel', q: 'Para saber si un individuo de fenotipo dominante es AA o Aa, se hace una cruza de prueba con…',
    opts: ['Otro individuo dominante', 'Un homocigota recesivo (aa)', 'Un heterocigota (Aa)', 'Un clon del individuo'], a: 1,
    exp: 'Con aa, cualquier alelo recesivo "escondido" queda al descubierto. Si aparece algún hijo recesivo → era Aa. Si salen todos dominantes (con muchos hijos) → muy probablemente AA.' },
  { id: 't31', tipo: 'teoria', tema: 'Mendel', q: 'Antes de Mendel se creía en la "herencia por mezcla". ¿Qué demostró Mendel?',
    opts: ['Que los rasgos se mezclan como pinturas', 'Que la herencia se transmite en "factores" (genes) que se mantienen separados y pueden reaparecer intactos en generaciones posteriores', 'Que el ADN es una doble hélice', 'Que los genes están en el cromosoma X'], a: 1,
    exp: 'En la F2 el rasgo recesivo (por ejemplo, la semilla verde) <b>reapareció intacto</b>: no se había mezclado ni perdido, estaba escondido en los heterocigotas.' },

  // ---------- Extensiones ----------
  { id: 't32', tipo: 'teoria', tema: 'Extensiones', q: 'El grupo sanguíneo AB es un ejemplo de…',
    opts: ['Dominancia incompleta', 'Codominancia: el heterocigota expresa ambos alelos completos (antígenos A y B)', 'Herencia ligada al X', 'Recesividad'], a: 1,
    exp: 'En la codominancia no hay mezcla: los glóbulos rojos de una persona AB tienen <b>los dos</b> antígenos. En la dominancia incompleta, en cambio, el heterocigota es intermedio (rojo × blanco = rosado).' },
  { id: 't33', tipo: 'teoria', tema: 'Extensiones', q: '¿Qué significa "alelos múltiples"?',
    opts: ['Que cada persona tiene más de dos alelos para un gen', 'Que en la población existen más de dos alelos para un gen, aunque cada persona tiene solo dos', 'Que un gen tiene muchos efectos', 'Que muchos genes controlan un rasgo'], a: 1,
    exp: 'Para el grupo ABO hay 3 alelos en la población (I<sup>A</sup>, I<sup>B</sup>, i), pero cada persona lleva solo dos, uno en cada homólogo. "Un gen, muchos efectos" es pleiotropía; "muchos genes, un rasgo" es herencia poligénica.' },
  { id: 't34', tipo: 'teoria', tema: 'Extensiones', q: '¿Por qué las enfermedades recesivas ligadas al X (como el daltonismo o la hemofilia) son más frecuentes en varones?',
    opts: ['Porque el cromosoma Y las causa', 'Porque los varones tienen un solo X: con un único alelo recesivo ya la manifiestan', 'Porque las mujeres no tienen cromosoma X', 'Porque son dominantes en los varones'], a: 1,
    exp: 'Los varones (XY) son <b>hemicigotas</b>: no tienen un segundo X que "tape" el alelo recesivo. Una mujer necesita dos copias (X<sup>d</sup>X<sup>d</sup>).' },
  { id: 't35', tipo: 'teoria', tema: 'Extensiones', q: '¿Cuál es la diferencia entre herencia ligada al sexo e influida por el sexo?',
    opts: ['Son lo mismo', 'En la ligada al sexo el gen está en el cromosoma X; en la influida por el sexo el gen es autosómico, pero su dominancia depende del sexo (ej.: calvicie)', 'La influida por el sexo está en el cromosoma Y', 'La ligada al sexo solo afecta a mujeres'], a: 1,
    exp: 'La calvicie es el ejemplo clásico de herencia <b>influida</b> por el sexo: el gen está en un autosoma, pero el alelo C domina en varones y es recesivo en mujeres.' },
  { id: 't36', tipo: 'teoria', tema: 'Extensiones', q: 'En la dominancia incompleta, al cruzar dos heterocigotas la proporción fenotípica esperada es…',
    opts: ['3:1', '1:2:1', '9:3:3:1', '1:1'], a: 1,
    exp: 'Como el heterocigota tiene su propio fenotipo (intermedio), cada genotipo se ve distinto: la proporción fenotípica es igual a la genotípica, <b>1:2:1</b>.' },
  { id: 't37', tipo: 'teoria', tema: 'Extensiones', q: 'Rasgos como la altura o el color de piel varían de forma continua porque…',
    opts: ['Son recesivos', 'Están determinados por muchos genes (herencia poligénica) y por el ambiente', 'Están ligados al X', 'Son codominantes'], a: 1,
    exp: 'Cuando muchos genes suman un pequeño efecto cada uno, y además influye el ambiente, aparece una gama continua de fenotipos en lugar de categorías.' },

  // ---------- Ejercicios ----------
  { id: 'e1', tipo: 'ejercicio', tema: 'Monohíbrido', q: 'Poder enrollar la lengua (L) domina sobre no poder (l). Juan no puede enrollarla. Ana sí puede, pero su padre no podía. ¿Qué cruzamiento es y qué proporción fenotípica se espera en sus hijos?',
    opts: ['LL × ll → 100% puede enrollarla', 'Ll × ll → 50% puede y 50% no puede', 'Ll × Ll → 75% puede y 25% no puede', 'll × ll → 100% no puede'], a: 1,
    exp: 'Juan tiene el fenotipo recesivo → ll. Ana es L_, y su padre ll le pasó una l → Ana es Ll. Ll × ll da 1/2 Ll (puede) y 1/2 ll (no puede).' },
  { id: 'e2', tipo: 'ejercicio', tema: 'Monohíbrido', q: 'Juan (ll) no puede enrollar la lengua; Ana sí puede, pero no sabemos nada de su familia. ¿Qué podemos decir sobre sus hijos?',
    opts: ['Seguro que 100% pueden', 'Seguro que 50% y 50%', 'Depende del genotipo de Ana: si es LL, 100% pueden; si es Ll, 50% pueden', 'Ninguno podrá'], a: 2,
    exp: 'Sin información extra, Ana es L_: hay que analizar los dos casos. La respuesta correcta es plantear ambos casos.' },
  { id: 'e3', tipo: 'ejercicio', tema: 'Autosómica dominante', q: 'Huntington es autosómica dominante (H). Un hombre afectado heterocigota (Hh) tiene hijos con una mujer sana (hh). ¿Qué probabilidad tiene cada hijo de heredar el alelo H?',
    opts: ['0%', '25%', '50%', '100%'], a: 2,
    exp: 'Hh × hh: él da H o h (1/2 cada uno) y ella solo da h. Cada hijo tiene 1/2 de probabilidad de ser Hh. La probabilidad se aplica a cada embarazo por separado.' },
  { id: 'e4', tipo: 'ejercicio', tema: 'Deducir genotipos', q: 'La ausencia de molares es autosómica dominante (M). Una pareja sin molares tiene una hija con molares. ¿Cuál es el genotipo de los padres?',
    opts: ['MM × MM', 'MM × Mm', 'Mm × Mm', 'Mm × mm'], a: 2,
    exp: 'La hija con molares es mm y recibió una m de cada padre. Los padres no tienen molares (M_) y llevan m → Mm × Mm. La opción Mm × mm no sirve porque un padre mm tendría molares.' },
  { id: 'e5', tipo: 'ejercicio', tema: 'Deducir genotipos', q: 'Siguiendo con la pareja Mm × Mm: ¿qué probabilidad tienen de tener otro hijo con molares y qué proporción de su descendencia será heterocigota?',
    opts: ['1/4 con molares; 1/2 heterocigotas', '3/4 con molares; 1/4 heterocigotas', '1/2 con molares; 1/2 heterocigotas', '1/4 con molares; 1/4 heterocigotas'], a: 0,
    exp: 'Mm × Mm → 1/4 MM, 1/2 Mm, 1/4 mm. "Con molares" es el recesivo (mm) = 1/4. Heterocigotas (Mm) = 1/2. ¡Cuidado con mezclar la pregunta fenotípica con la genotípica!' },
  { id: 'e6', tipo: 'ejercicio', tema: 'Probabilidad', q: 'Una pareja Aa × Aa ya tuvo tres hijos aa. ¿Qué probabilidad hay de que el cuarto también sea aa?',
    opts: ['0%, ya "salieron" demasiados', '1/4', '1/64', '3/4'], a: 1,
    exp: 'Cada fecundación es independiente: el azar no tiene memoria. Siempre es 1/4. (1/64 sería la probabilidad de tener CUATRO hijos aa seguidos, calculada antes de que naciera el primero.)' },
  { id: 'e7', tipo: 'ejercicio', tema: 'ABO', q: 'Una pareja solo puede tener hijos de grupo B heterocigotas o de grupo 0. ¿Qué cruzamiento es?',
    opts: ['I<sup>B</sup>i × ii', 'I<sup>B</sup>I<sup>B</sup> × ii', 'I<sup>A</sup>i × I<sup>B</sup>i', 'I<sup>A</sup>I<sup>B</sup> × ii'], a: 0,
    exp: 'Para que salga 0 (ii), los dos padres tienen que tener una i. Para que salga B, alguno tiene I<sup>B</sup>. Con I<sup>B</sup>i (grupo B) × ii (grupo 0): 1/2 I<sup>B</sup>i y 1/2 ii. Con I<sup>B</sup>I<sup>B</sup> × ii no saldría ningún 0.' },
  { id: 'e8', tipo: 'ejercicio', tema: 'ABO', q: 'Un hombre es de grupo 0, la mujer es de grupo A y el hijo es de grupo B. Usando solo el sistema ABO, ¿puede el hombre ser el padre biológico?',
    opts: ['Sí, si el hombre es heterocigota', 'Sí, porque el alelo B puede surgir por recombinación', 'No: alguien de grupo 0 (ii) solo puede aportar el alelo i, y el hijo necesita un I<sup>B</sup> que la madre tampoco tiene', 'No se puede saber nada con los grupos sanguíneos'], a: 2,
    exp: 'Es el caso Chaplin. El hijo B necesita un I<sup>B</sup>. La madre (A) no lo tiene, y el hombre (ii) tampoco. Queda <b>excluido</b>. Además, la madre es I<sup>A</sup>i y el niño I<sup>B</sup>i (recibió la i de la madre).' },
  { id: 'e9', tipo: 'ejercicio', tema: 'ABO', q: '¿Cómo podrán ser los hijos de un hombre AB y una mujer AB?',
    opts: ['100% AB', '1/4 A, 1/2 AB, 1/4 B', '1/4 A, 1/4 B, 1/4 AB, 1/4 0', '3/4 AB, 1/4 0'], a: 1,
    exp: 'I<sup>A</sup>I<sup>B</sup> × I<sup>A</sup>I<sup>B</sup> → 1/4 I<sup>A</sup>I<sup>A</sup> (A), 1/2 I<sup>A</sup>I<sup>B</sup> (AB), 1/4 I<sup>B</sup>I<sup>B</sup> (B). No puede salir 0: nadie tiene una i.' },
  { id: 'e10', tipo: 'ejercicio', tema: 'ABO', q: '¿Qué probabilidad tiene una pareja AB × 0 de tener un hijo de grupo A? ¿Y uno de grupo 0?',
    opts: ['A: 1/2; 0: 0', 'A: 1/4; 0: 1/4', 'A: 1/2; 0: 1/2', 'A: 0; 0: 1/2'], a: 0,
    exp: 'I<sup>A</sup>I<sup>B</sup> × ii → 1/2 I<sup>A</sup>i (A) y 1/2 I<sup>B</sup>i (B). Nunca sale 0 porque siempre reciben I<sup>A</sup> o I<sup>B</sup> del progenitor AB.' },
  { id: 'e11', tipo: 'ejercicio', tema: 'ABO', q: 'Un niño es grupo 0, la madre es grupo A. El posible padre 1 es grupo B y el posible padre 2 es grupo AB. ¿Qué se puede concluir?',
    opts: ['El padre 1 es el padre', 'El padre 2 queda excluido; el padre 1 podría serlo (si es I<sup>B</sup>i), pero no se confirma', 'Los dos quedan excluidos', 'No se puede concluir nada'], a: 1,
    exp: 'El niño es ii y necesita una i de cada lado. El padre 2 (I<sup>A</sup>I<sup>B</sup>) no tiene i → excluido. El padre 1 podría ser I<sup>B</sup>i → compatible. Recordá: el ABO excluye, nunca confirma.' },
  { id: 'e12', tipo: 'ejercicio', tema: 'ABO', q: 'Un padre A y una madre B tienen hijos AB, A, B y 0. ¿Cuáles son sus genotipos?',
    opts: ['I<sup>A</sup>I<sup>A</sup> × I<sup>B</sup>I<sup>B</sup>', 'I<sup>A</sup>i × I<sup>B</sup>i', 'I<sup>A</sup>I<sup>A</sup> × I<sup>B</sup>i', 'I<sup>A</sup>I<sup>B</sup> × ii'], a: 1,
    exp: 'Un hijo 0 (ii) obliga a que los dos padres tengan una i. I<sup>A</sup>i × I<sup>B</sup>i da los cuatro grupos, cada uno con 1/4.' },
  { id: 'e13', tipo: 'ejercicio', tema: 'Deducir genotipos', q: 'Dos moscas negras tienen 216 hijos negros y 72 blancos. ¿Cuál es el genotipo de los padres? (N negro, n blanco)',
    opts: ['NN × NN', 'NN × Nn', 'Nn × Nn', 'Nn × nn'], a: 2,
    exp: '216 : 72 = 3 : 1 (216 ÷ 72 = 3). La "firma" del 3:1 es Aa × Aa. Además, si nacen blancas (nn), ambos padres tienen una n, y como son negros, son Nn.' },
  { id: 'e14', tipo: 'ejercicio', tema: 'Deducir genotipos', q: 'Drosophila: cuerpo negro recesivo, bronce dominante. Un cruce da 78 bronce y 23 negras. ¿Genotipo de los padres?',
    opts: ['NN × nn', 'Nn × nn', 'Nn × Nn', 'NN × Nn'], a: 2,
    exp: '78/23 ≈ 3,4 ≈ 3:1 → Nn × Nn (ambos bronce). Nn × nn daría ~1:1, y NN × algo no daría ninguna negra.' },
  { id: 'e15', tipo: 'ejercicio', tema: 'Cruza de prueba', q: 'El pelo rizado domina sobre el liso. Querés saber si un perro rizado es heterocigota. ¿Con qué hembra lo cruzás?',
    opts: ['Con una rizada homocigota', 'Con una rizada heterocigota', 'Con una de pelo liso (homocigota recesiva)', 'Da igual'], a: 2,
    exp: 'Cruza de prueba: con una hembra lisa (rr). Si nace algún cachorro liso, el perro es Rr. Si con muchos cachorros todos salen rizados, muy probablemente es RR.' },
  { id: 'e16', tipo: 'ejercicio', tema: 'Deducir dominancia', q: 'El ratón A (blanco) × negro da todos blancos. El ratón B (blanco) × negro da 5 blancos y 5 negros. ¿Qué podés concluir?',
    opts: ['A es Bb y B es BB', 'A es BB y B es Bb', 'Los dos son BB', 'El negro es dominante'], a: 1,
    exp: 'Como en el primer cruce el negro desaparece, el blanco domina. A da 100% blancos → BB. B da 1:1 → Bb (Bb × bb).' },
  { id: 'e17', tipo: 'ejercicio', tema: 'Deducir genotipos', q: 'Un cobaya blanco (cuyos padres son negros) se cruza con uno negro (cuyos padres son uno negro y otro blanco). ¿Qué descendencia se espera?',
    opts: ['100% negros', '3/4 negros, 1/4 blancos', '1/2 negros, 1/2 blancos', '100% blancos'], a: 2,
    exp: 'Negro domina (dos negros tuvieron un blanco). Blanco = nn. El negro tuvo un padre blanco → Nn. Nn × nn = 1/2 Nn (negros) y 1/2 nn (blancos).' },
  { id: 'e18', tipo: 'ejercicio', tema: 'Deducir genotipos', q: 'La falta de cuernos (F) domina sobre la presencia de cuernos (f). Un toro sin cuernos tiene un ternero con cuernos con una vaca con cuernos. ¿Cuál es el genotipo del toro?',
    opts: ['FF', 'Ff', 'ff', 'No se puede saber'], a: 1,
    exp: 'El ternero con cuernos es ff, así que recibió una f del toro. Como el toro no tiene cuernos (F_) → Ff.' },
  { id: 'e19', tipo: 'ejercicio', tema: 'Monohíbrido', q: 'Ojos oscuros domina sobre claros. ¿Qué hijos tendrá una pareja en la que los dos tienen ojos claros?',
    opts: ['100% ojos claros', '3/4 oscuros, 1/4 claros', '1/2 y 1/2', 'Depende de los abuelos'], a: 0,
    exp: 'Ojos claros = recesivo = dd. dd × dd solo puede dar dd. Los abuelos no importan: lo que se hereda es el genotipo de los padres, y ya lo conocemos con certeza.' },
  { id: 'e20', tipo: 'ejercicio', tema: 'Monohíbrido', q: 'Mendel cruzó plantas de línea pura de semilla amarilla (AA) con verde (aa). ¿Cómo es la F2 (F1 × F1)?',
    opts: ['100% amarillas', 'Genotipo 1 AA : 2 Aa : 1 aa; fenotipo 3 amarillas : 1 verde', '1 amarilla : 1 verde', 'Todas verdes'], a: 1,
    exp: 'La F1 es toda Aa. Aa × Aa → 1:2:1 genotípico y 3:1 fenotípico. El verde "reaparece" en la F2.' },
  { id: 'e21', tipo: 'ejercicio', tema: 'Dihíbrido', q: 'Dos dihíbridos AaBb × AaBb (genes en cromosomas distintos). ¿Qué proporción de la descendencia será aabb?',
    opts: ['1/4', '1/16', '9/16', '3/16'], a: 1,
    exp: 'Gen por gen: P(aa) = 1/4 y P(bb) = 1/4. "aa Y bb" → 1/4 × 1/4 = 1/16. El famoso 9:3:3:1 es 9 A_B_, 3 A_bb, 3 aaB_, 1 aabb.' },
  { id: 'e22', tipo: 'ejercicio', tema: 'Dihíbrido', q: 'Un hombre con aniridia (A, dominante) sin jaqueca, hijo de una madre sin aniridia, tiene hijos con una mujer con jaqueca (J, dominante) sin aniridia, hija de un padre sin jaqueca. ¿Qué proporción de hijos tendrá ambos males?',
    opts: ['1/16', '1/4', '1/2', '9/16'], a: 1,
    exp: 'Él: Aajj. Ella: aaJj. P(aniridia) = 1/2 y P(jaqueca) = 1/2 → ambas: 1/2 × 1/2 = 1/4.' },
  { id: 'e23', tipo: 'ejercicio', tema: 'Dihíbrido', q: 'Tomates: rojo (R) > amarillo (r); normal (N) > enano (n). Rojo normal × amarillo normal da 30 rojas normales, 31 amarillas normales, 9 rojas enanas y 10 amarillas enanas. ¿Genotipo de los padres?',
    opts: ['RRNN × rrNN', 'RrNn × rrNn', 'RrNN × rrnn', 'RRNn × rrNn'], a: 1,
    exp: 'Color: rojas (39) vs amarillas (41) ≈ 1:1 → Rr × rr. Tamaño: normales (61) vs enanas (19) ≈ 3:1 → Nn × Nn. Juntando: RrNn × rrNn. (Analizar cada carácter por separado es la clave.)' },
  { id: 'e24', tipo: 'ejercicio', tema: 'Dominancia incompleta', q: 'Dos plantas de flores naranjas dan 30 rojas, 60 naranjas y 30 amarillas. Si cruzás una naranja con una roja, ¿qué esperás?',
    opts: ['100% naranjas', '1/2 rojas, 1/2 naranjas', '3/4 rojas, 1/4 amarillas', '1/4 rojas, 1/2 naranjas, 1/4 amarillas'], a: 1,
    exp: '1:2:1 → dominancia incompleta; naranja = RA. RA × RR → 1/2 RR (roja) y 1/2 RA (naranja).' },
  { id: 'e25', tipo: 'ejercicio', tema: 'Dominancia incompleta', q: 'Una mariposa gris × una negra da 116 negras y 115 grises; la gris × una blanca da 93 blancas y 94 grises. ¿Qué es la mariposa gris?',
    opts: ['Homocigota dominante', 'Heterocigota con fenotipo intermedio (BN)', 'Homocigota recesiva', 'Un mutante'], a: 1,
    exp: 'Los dos cruces dan 1:1 y el gris es un intermedio entre blanco y negro: el gris es el heterocigota BN. Negras = NN y blancas = BB. (La resolución lo llama codominancia; con fenotipo intermedio también se lo llama dominancia incompleta.)' },
  { id: 'e26', tipo: 'ejercicio', tema: 'Ligada al X', q: 'Una mujer portadora de daltonismo (X<sup>D</sup>X<sup>d</sup>) tiene hijos con un hombre de visión normal (X<sup>D</sup>Y). ¿Qué proporción de sus HIJOS VARONES será daltónica?',
    opts: ['0', '1/4', '1/2', '100%'], a: 2,
    exp: 'Los varones reciben la Y del padre y una X de la madre: la mitad recibe X<sup>d</sup> → 1/2 de los varones son daltónicos. (Sobre el total de hijos sería 1/4; leé bien sobre qué grupo te preguntan.)' },
  { id: 'e27', tipo: 'ejercicio', tema: 'Ligada al X', q: 'Un hombre hemofílico (X<sup>h</sup>Y) tiene hijos con una mujer no portadora (X<sup>H</sup>X<sup>H</sup>). ¿Qué pasa con su descendencia?',
    opts: ['Todos los hijos varones son hemofílicos', 'Todas las hijas son portadoras y ningún hijo varón es hemofílico', 'La mitad de las hijas son hemofílicas', 'Nadie hereda el alelo'], a: 1,
    exp: 'El padre les pasa su X<sup>h</sup> a <b>todas</b> las hijas (portadoras: X<sup>H</sup>X<sup>h</sup>) y la Y a <b>todos</b> los hijos varones (sanos). Un padre nunca pasa su X a sus hijos varones.' },
  { id: 'e28', tipo: 'ejercicio', tema: 'Ligada al X', q: 'Una mujer X<sup>L</sup>X<sup>l</sup> (l = letal recesivo) tiene hijos con un hombre X<sup>L</sup>Y. ¿Cuál es la proporción de sexos entre los que nacen?',
    opts: ['1 mujer : 1 varón', '2 mujeres : 1 varón', '3 mujeres : 1 varón', 'Solo nacen mujeres'], a: 1,
    exp: 'De cada 4: X<sup>L</sup>X<sup>L</sup>, X<sup>L</sup>X<sup>l</sup>, X<sup>L</sup>Y, X<sup>l</sup>Y (no nace). Nacen 2 mujeres y 1 varón.' },
  { id: 'e29', tipo: 'ejercicio', tema: 'Influida por el sexo', q: 'Calvicie: C domina en varones y es recesivo en mujeres. Un hombre CN y una mujer CN tienen hijos. ¿Qué proporción de hijos varones y de hijas será calva?',
    opts: ['Varones 1/4, mujeres 3/4', 'Varones 3/4, mujeres 1/4', 'Ambos 1/2', 'Varones 100%, mujeres 0'], a: 1,
    exp: 'CN × CN → 1/4 CC, 1/2 CN, 1/4 NN. Varones calvos: CC + CN = 3/4. Mujeres calvas: solo CC = 1/4.' },
  { id: 'e30', tipo: 'ejercicio', tema: 'Probabilidad', q: 'Dos padres de pulgar recto (D) tienen un hijo de pulgar extensible (dd). ¿Qué probabilidad hay de que el próximo hijo tenga pulgar recto?',
    opts: ['1/4', '1/2', '3/4', '100%'], a: 2,
    exp: 'Si tuvieron un hijo dd, los dos son Dd. Dd × Dd → 3/4 D_ (recto).' },
  { id: 'e31', tipo: 'ejercicio', tema: 'Desafío', q: 'DESAFÍO: Dd × Dd. Elegís al azar uno de los hijos que tienen pulgar recto. ¿Qué probabilidad tiene de ser heterocigota?',
    opts: ['1/2', '2/3', '3/4', '1/4'], a: 1,
    exp: 'Entre los rectos hay 1 DD y 2 Dd (el dd quedó afuera porque ya sabés que es recto). Entonces 2 de 3 son Dd → <b>2/3</b>. Moraleja metacognitiva: cuando el enunciado te da información ("sabemos que es recto"), cambia el total sobre el que contás.' },
  { id: 'e32', tipo: 'ejercicio', tema: 'Monohíbrido', q: '¿Puede una pareja formada por una persona de ojos claros y otra de ojos oscuros tener un hijo de ojos claros? (oscuro D > claro d)',
    opts: ['No, nunca', 'Sí, si la persona de ojos oscuros es heterocigota (Dd); en ese caso 50% de probabilidad por hijo', 'Sí, siempre con 25%', 'Solo si los dos son heterocigotas'], a: 1,
    exp: 'dd × Dd → 1/2 Dd (oscuros) y 1/2 dd (claros). Si la persona de ojos oscuros fuera DD, todos saldrían oscuros.' }
];

/* Dificultad de cada pregunta (el simulacro toma 2 de cada nivel) */
window.LEVELS = {
  facil: ['t1', 't2', 't3', 't6', 't7', 't8', 't9', 't11', 't13', 't14', 't15', 't19', 't20', 't21', 't23', 't24', 't25', 't28', 'e3', 'e9', 'e19', 'e20'],
  medio: ['t4', 't5', 't10', 't12', 't16', 't17', 't18', 't22', 't26', 't27', 't29', 't30', 't31', 't32', 't33', 't34', 't36', 't37', 'e1', 'e2', 'e4', 'e5', 'e7', 'e10', 'e12', 'e13', 'e14', 'e15', 'e16', 'e17', 'e18', 'e24', 'e30', 'e32'],
  dificil: ['t35', 'e6', 'e8', 'e11', 'e21', 'e22', 'e23', 'e25', 'e26', 'e27', 'e28', 'e29', 'e31']
};
