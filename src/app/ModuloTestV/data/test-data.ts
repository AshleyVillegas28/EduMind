import { Test, Opcion, ResultadoCategoria } from '../interfaces/test-vocacional.interface';

export const OPCIONES_GLOBALES: Opcion[] = [
  { valor: 1, texto: 'Totalmente en desacuerdo' },
  { valor: 2, texto: 'En desacuerdo' },
  { valor: 3, texto: 'Neutral' },
  { valor: 4, texto: 'De acuerdo' },
  { valor: 5, texto: 'Totalmente de acuerdo' },
];

export const TESTS_DISPONIBLES: Test[] = [
  // --- TEST GENERAL ---
  {
    id: 'test-general-chaside',
    nombre: 'Test Vocacional General (CHASIDE)',
    descripcion: 'Evaluación integral de 25 preguntas que cubre todas las áreas profesionales del método CHASIDE.',
    cantidadPreguntas: 25,
    categorias: ['Ciencias Exactas', 'Humanidades', 'Artes', 'Salud', 'Ingeniería e Informática', 'Defensa y Seguridad', 'Economía y Administración'],
    preguntas: [
      { idPregunta: 1, pregunta: '¿Me gusta resolver problemas matemáticos?', categoria: 'Ciencias Exactas' },
      { idPregunta: 2, pregunta: '¿Disfruto analizar datos y estadísticas?', categoria: 'Ciencias Exactas' },
      { idPregunta: 3, pregunta: '¿Tengo interés por la física o química?', categoria: 'Ciencias Exactas' },
      { idPregunta: 4, pregunta: '¿Me gusta leer sobre historia o filosofía?', categoria: 'Humanidades' },
      { idPregunta: 5, pregunta: '¿Disfruto escribir textos o ensayos?', categoria: 'Humanidades' },
      { idPregunta: 6, pregunta: '¿Me interesa comprender el comportamiento humano?', categoria: 'Humanidades' },
      { idPregunta: 7, pregunta: '¿Me gusta dibujar, pintar o diseñar?', categoria: 'Artes' },
      { idPregunta: 8, pregunta: '¿Disfruto la música o actividades creativas?', categoria: 'Artes' },
      { idPregunta: 9, pregunta: '¿Tengo imaginación para crear cosas nuevas?', categoria: 'Artes' },
      { idPregunta: 10, pregunta: '¿Me interesa ayudar a personas con problemas físicos o emocionales?', categoria: 'Salud' },
      { idPregunta: 11, pregunta: '¿Me gustaría trabajar en hospitales o clínicas?', categoria: 'Salud' },
      { idPregunta: 12, pregunta: '¿Me interesa aprender sobre el cuerpo humano?', categoria: 'Salud' },
      { idPregunta: 13, pregunta: '¿Me gusta la tecnología?', categoria: 'Ingeniería e Informática' },
      { idPregunta: 14, pregunta: '¿Disfruto aprender sobre computadoras y sistemas?', categoria: 'Ingeniería e Informática' },
      { idPregunta: 15, pregunta: '¿Me interesa programar aplicaciones o videojuegos?', categoria: 'Ingeniería e Informática' },
      { idPregunta: 16, pregunta: '¿Me interesa proteger y ayudar a la sociedad?', categoria: 'Defensa y Seguridad' },
      { idPregunta: 17, pregunta: '¿Me gustaría trabajar en seguridad o emergencias?', categoria: 'Defensa y Seguridad' },
      { idPregunta: 18, pregunta: '¿Tengo disciplina y autocontrol?', categoria: 'Defensa y Seguridad' },
      { idPregunta: 19, pregunta: '¿Me interesa administrar dinero o negocios?', categoria: 'Economía y Administración' },
      { idPregunta: 20, pregunta: '¿Me gusta liderar grupos de trabajo?', categoria: 'Economía y Administración' },
      { idPregunta: 21, pregunta: '¿Disfruto organizar actividades o proyectos?', categoria: 'Economía y Administración' },
      { idPregunta: 22, pregunta: '¿Me considero una persona lógica y analítica?', categoria: 'Ciencias Exactas' },
      { idPregunta: 23, pregunta: '¿Me considero empático con los demás?', categoria: 'Salud' },
      { idPregunta: 24, pregunta: '¿Me gusta construir o diseñar soluciones?', categoria: 'Ingeniería e Informática' },
      { idPregunta: 25, pregunta: '¿Tengo facilidad para tomar decisiones?', categoria: 'Economía y Administración' }
    ]
  },
  // --- TESTS ESPECÍFICOS ---
  {
    id: 'test-especifico-c',
    nombre: 'Test de Ciencias Exactas (C)',
    descripcion: 'Enfocado en habilidades matemáticas, físicas y de análisis lógico.',
    cantidadPreguntas: 10,
    categorias: ['Ciencias Exactas'],
    preguntas: [
      { idPregunta: 101, pregunta: '¿Te apasiona resolver acertijos lógicos complejos?', categoria: 'Ciencias Exactas' },
      { idPregunta: 102, pregunta: '¿Disfrutas explicando teoremas o leyes físicas?', categoria: 'Ciencias Exactas' },
      { idPregunta: 103, pregunta: '¿Te interesa el estudio de los astros y el universo?', categoria: 'Ciencias Exactas' },
      { idPregunta: 104, pregunta: '¿Pasas tiempo analizando gráficos y tendencias numéricas?', categoria: 'Ciencias Exactas' },
      { idPregunta: 105, pregunta: '¿Te gusta realizar cálculos mentales rápidos?', categoria: 'Ciencias Exactas' },
      { idPregunta: 106, pregunta: '¿Te interesa la investigación en laboratorios químicos?', categoria: 'Ciencias Exactas' },
      { idPregunta: 107, pregunta: '¿Crees que todo en la naturaleza tiene una explicación matemática?', categoria: 'Ciencias Exactas' },
      { idPregunta: 108, pregunta: '¿Te gustaría trabajar con grandes volúmenes de datos (Big Data)?', categoria: 'Ciencias Exactas' },
      { idPregunta: 109, pregunta: '¿Disfrutas de la precisión y el rigor científico?', categoria: 'Ciencias Exactas' },
      { idPregunta: 110, pregunta: '¿Te interesa cómo se aplican las matemáticas en la vida real?', categoria: 'Ciencias Exactas' }
    ]
  },
  {
    id: 'test-especifico-h',
    nombre: 'Test de Humanidades (H)',
    descripcion: 'Enfocado en el estudio de la sociedad, historia y comportamiento humano.',
    cantidadPreguntas: 10,
    categorias: ['Humanidades'],
    preguntas: [
      { idPregunta: 201, pregunta: '¿Te gusta investigar sobre culturas antiguas?', categoria: 'Humanidades' },
      { idPregunta: 202, pregunta: '¿Disfrutas analizando el discurso de figuras políticas?', categoria: 'Humanidades' },
      { idPregunta: 203, pregunta: '¿Te interesa el estudio de las leyes y la justicia?', categoria: 'Humanidades' },
      { idPregunta: 204, pregunta: '¿Te apasiona leer literatura clásica o contemporánea?', categoria: 'Humanidades' },
      { idPregunta: 205, pregunta: '¿Te gusta ayudar a otros a resolver conflictos interpersonales?', categoria: 'Humanidades' },
      { idPregunta: 206, pregunta: '¿Te interesa la sociología y los cambios en la sociedad?', categoria: 'Humanidades' },
      { idPregunta: 207, pregunta: '¿Disfrutas de las visitas a museos históricos?', categoria: 'Humanidades' },
      { idPregunta: 208, pregunta: '¿Te gustaría aprender varios idiomas extranjeros?', categoria: 'Humanidades' },
      { idPregunta: 209, pregunta: '¿Te cuestionas constantemente el sentido de la vida (filosofía)?', categoria: 'Humanidades' },
      { idPregunta: 210, pregunta: '¿Tienes facilidad para redactar informes y ensayos?', categoria: 'Humanidades' }
    ]
  },
  {
    id: 'test-especifico-a',
    nombre: 'Test de Artes (A)',
    descripcion: 'Evaluación de tu capacidad creativa, visual y expresiva.',
    cantidadPreguntas: 10,
    categorias: ['Artes'],
    preguntas: [
      { idPregunta: 301, pregunta: '¿Pasas mucho tiempo imaginando mundos o personajes?', categoria: 'Artes' },
      { idPregunta: 302, pregunta: '¿Te gusta experimentar con diferentes técnicas de pintura?', categoria: 'Artes' },
      { idPregunta: 303, pregunta: '¿Te interesa el diseño de interiores o de modas?', categoria: 'Artes' },
      { idPregunta: 304, pregunta: '¿Disfrutas editando videos o fotos en tu tiempo libre?', categoria: 'Artes' },
      { idPregunta: 305, pregunta: '¿Te gustaría actuar en una obra de teatro o película?', categoria: 'Artes' },
      { idPregunta: 306, pregunta: '¿Te atrae el diseño gráfico y la publicidad visual?', categoria: 'Artes' },
      { idPregunta: 307, pregunta: '¿Eres capaz de apreciar la estética en cosas cotidianas?', categoria: 'Artes' },
      { idPregunta: 308, pregunta: '¿Te interesa la arquitectura y el diseño de edificios?', categoria: 'Artes' },
      { idPregunta: 309, pregunta: '¿Te gusta tocar instrumentos musicales o componer?', categoria: 'Artes' },
      { idPregunta: 310, pregunta: '¿Consideras que el arte es tu principal forma de expresión?', categoria: 'Artes' }
    ]
  },
  {
    id: 'test-especifico-s',
    nombre: 'Test de Salud (S)',
    descripcion: 'Orientado a la medicina, enfermería y bienestar físico/mental.',
    cantidadPreguntas: 10,
    categorias: ['Salud'],
    preguntas: [
      { idPregunta: 401, pregunta: '¿Te sientes tranquilo en entornos hospitalarios?', categoria: 'Salud' },
      { idPregunta: 402, pregunta: '¿Te interesa conocer la composición química de los medicamentos?', categoria: 'Salud' },
      { idPregunta: 403, pregunta: '¿Te gustaría realizar cirugías o procedimientos médicos?', categoria: 'Salud' },
      { idPregunta: 404, pregunta: '¿Disfrutas aprendiendo sobre nutrición y vida sana?', categoria: 'Salud' },
      { idPregunta: 405, pregunta: '¿Te interesa la rehabilitación física de los pacientes?', categoria: 'Salud' },
      { idPregunta: 406, pregunta: '¿Te gustaría trabajar en el área de emergencias médicas?', categoria: 'Salud' },
      { idPregunta: 407, pregunta: '¿Te interesa la odontología o el cuidado dental?', categoria: 'Salud' },
      { idPregunta: 408, pregunta: '¿Te apasiona la psicología clínica y la salud mental?', categoria: 'Salud' },
      { idPregunta: 409, pregunta: '¿Te gustaría investigar sobre genética o biotecnología?', categoria: 'Salud' },
      { idPregunta: 410, pregunta: '¿Crees que tienes paciencia para cuidar a personas mayores?', categoria: 'Salud' }
    ]
  },
  {
    id: 'test-especifico-i',
    nombre: 'Test de Ingeniería e Informática (I)',
    descripcion: 'Enfocado en software, hardware, robótica y soluciones tecnológicas.',
    cantidadPreguntas: 10,
    categorias: ['Ingeniería e Informática'],
    preguntas: [
      { idPregunta: 501, pregunta: '¿Te gusta desarmar y armar dispositivos electrónicos?', categoria: 'Ingeniería e Informática' },
      { idPregunta: 502, pregunta: '¿Pasas horas intentando arreglar un error en un programa?', categoria: 'Ingeniería e Informática' },
      { idPregunta: 503, pregunta: '¿Te interesa la creación de redes de computadoras?', categoria: 'Ingeniería e Informática' },
      { idPregunta: 504, pregunta: '¿Te gustaría diseñar piezas mecánicas para una industria?', categoria: 'Ingeniería e Informática' },
      { idPregunta: 505, pregunta: '¿Te atrae el desarrollo de aplicaciones móviles?', categoria: 'Ingeniería e Informática' },
      { idPregunta: 506, pregunta: '¿Te interesa la domótica (casas inteligentes)?', categoria: 'Ingeniería e Informática' },
      { idPregunta: 507, pregunta: '¿Disfrutas aprendiendo nuevos lenguajes de programación?', categoria: 'Ingeniería e Informática' },
      { idPregunta: 508, pregunta: '¿Te gustaría trabajar en la industria aeroespacial?', categoria: 'Ingeniería e Informática' },
      { idPregunta: 509, pregunta: '¿Te interesa la seguridad informática (hacking ético)?', categoria: 'Ingeniería e Informática' },
      { idPregunta: 510, pregunta: '¿Te apasiona la idea de crear tu propio videojuego?', categoria: 'Ingeniería e Informática' }
    ]
  },
  {
    id: 'test-especifico-d',
    nombre: 'Test de Defensa y Seguridad (D)',
    descripcion: 'Evaluación de valentía, disciplina y vocación de protección.',
    cantidadPreguntas: 10,
    categorias: ['Defensa y Seguridad'],
    preguntas: [
      { idPregunta: 601, pregunta: '¿Te gusta el entrenamiento físico intenso?', categoria: 'Defensa y Seguridad' },
      { idPregunta: 602, pregunta: '¿Te interesa la criminología y la investigación policial?', categoria: 'Defensa y Seguridad' },
      { idPregunta: 603, pregunta: '¿Estarías dispuesto a arriesgarte por salvar a otros?', categoria: 'Defensa y Seguridad' },
      { idPregunta: 604, pregunta: '¿Te gusta seguir órdenes y mantener la jerarquía?', categoria: 'Defensa y Seguridad' },
      { idPregunta: 605, pregunta: '¿Te interesa la defensa civil y la gestión de desastres?', categoria: 'Defensa y Seguridad' },
      { idPregunta: 606, pregunta: '¿Te gustaría pilotar vehículos de rescate o combate?', categoria: 'Defensa y Seguridad' },
      { idPregunta: 607, pregunta: '¿Tienes facilidad para mantener la calma en crisis?', categoria: 'Defensa y Seguridad' },
      { idPregunta: 608, pregunta: '¿Te atrae la vida militar y sus valores?', categoria: 'Defensa y Seguridad' },
      { idPregunta: 609, pregunta: '¿Te interesa la ciberdefensa nacional?', categoria: 'Defensa y Seguridad' },
      { idPregunta: 610, pregunta: '¿Te gustaría trabajar en la vigilancia de fronteras?', categoria: 'Defensa y Seguridad' }
    ]
  },
  {
    id: 'test-especifico-e',
    nombre: 'Test de Economía y Administración (E)',
    descripcion: 'Enfocado en negocios, finanzas, liderazgo y emprendimiento.',
    cantidadPreguntas: 10,
    categorias: ['Economía y Administración'],
    preguntas: [
      { idPregunta: 701, pregunta: '¿Te gusta idear planes para vender productos?', categoria: 'Economía y Administración' },
      { idPregunta: 702, pregunta: '¿Te interesa cómo funcionan las bolsas de valores?', categoria: 'Economía y Administración' },
      { idPregunta: 703, pregunta: '¿Disfrutas negociando precios o condiciones?', categoria: 'Economía y Administración' },
      { idPregunta: 704, pregunta: '¿Te gustaría crear y dirigir tu propia empresa?', categoria: 'Economía y Administración' },
      { idPregunta: 705, pregunta: '¿Te interesa el marketing y la publicidad digital?', categoria: 'Economía y Administración' },
      { idPregunta: 706, pregunta: '¿Tienes facilidad para organizar eventos complejos?', categoria: 'Economía y Administración' },
      { idPregunta: 707, pregunta: '¿Te gusta analizar los gastos e ingresos (contabilidad)?', categoria: 'Economía y Administración' },
      { idPregunta: 708, pregunta: '¿Te interesa el comercio internacional y las exportaciones?', categoria: 'Economía y Administración' },
      { idPregunta: 709, pregunta: '¿Disfrutas motivando a otros para cumplir metas?', categoria: 'Economía y Administración' },
      { idPregunta: 710, pregunta: '¿Te gustaría trabajar en recursos humanos seleccionando talento?', categoria: 'Economía y Administración' }
    ]
  }
];

export const RESULTADOS_POR_CATEGORIA: { [key: string]: Partial<ResultadoCategoria> } = {
  'Ciencias Exactas': {
    perfil: 'Análisis Lógico y Científico',
    interpretacion: 'Tienes afinidad por el análisis lógico, matemático y científico.',
    carreras: ['Matemáticas', 'Física', 'Estadística', 'Química', 'Ciencia de Datos'],
    mensaje: '¡Tu capacidad analítica es una herramienta poderosa para entender el universo!'
  },
  'Humanidades': {
    perfil: 'Comunicativo y Crítico',
    interpretacion: 'Posees habilidades comunicativas y pensamiento crítico.',
    carreras: ['Derecho', 'Psicología', 'Comunicación', 'Filosofía', 'Sociología'],
    mensaje: 'Tu interés por el comportamiento humano y la sociedad es fundamental.'
  },
  'Artes': {
    perfil: 'Creativo y Expresivo',
    interpretacion: 'Destacas en creatividad y expresión artística.',
    carreras: ['Diseño Gráfico', 'Producción Audiovisual', 'Música', 'Arquitectura', 'Artes Visuales'],
    mensaje: '¡Tu creatividad no tiene límites, el mundo necesita tu visión artística!'
  },
  'Salud': {
    perfil: 'Vocación de Servicio y Empatía',
    interpretacion: 'Tienes vocación de ayuda y empatía hacia las personas.',
    carreras: ['Medicina', 'Psicología', 'Enfermería', 'Terapia Física', 'Nutrición'],
    mensaje: 'Tu empatía es la base para transformar vidas a través del cuidado.'
  },
  'Ingeniería e Informática': {
    perfil: 'Tecnológico y Resolutivo',
    interpretacion: 'Tienes interés en tecnología y resolución de problemas.',
    carreras: ['Ingeniería en Sistemas', 'Desarrollo de Software', 'Ciberseguridad', 'Inteligencia Artificial', 'Ingeniería Mecatrónica'],
    mensaje: '¡Tienes habilidades destacadas para construir el futuro tecnológico!'
  },
  'Defensa y Seguridad': {
    perfil: 'Liderazgo y Control',
    interpretacion: 'Presentas habilidades de liderazgo y control en situaciones difíciles.',
    carreras: ['Policía', 'Fuerzas Armadas', 'Bomberos', 'Gestión de Riesgos', 'Seguridad Industrial'],
    mensaje: 'Tu valentía y disciplina son admirables y necesarias para la sociedad.'
  },
  'Economía y Administración': {
    perfil: 'Organizativo y Empresarial',
    interpretacion: 'Tienes capacidad organizativa y visión empresarial.',
    carreras: ['Administración de Empresas', 'Contabilidad', 'Marketing', 'Finanzas', 'Negocios Internacionales'],
    mensaje: 'Tu visión estratégica te permitirá liderar proyectos exitosos.'
  }
};
