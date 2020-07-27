const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'x' },
        'task-2': { id: 'task-2', content: 'x' },
        'task-3': { id: 'task-3', content: '55' },
        'task-4': { id: 'task-4', content: '5' },
        'task-5': { id: 'task-5', content: '+' },
        'task-6': { id: 'task-6', content: '+' },
        'task-7': { id: 'task-7', content: '=' },
        'task-8': { id: 'task-8', content: '-' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            // title: 'In progress',
            taskIds: []
        },
        'column-2': {
            id: 'column-2',
            // title: 'To do',
            taskIds: [
                'task-1',
                'task-2',
                'task-3',
                'task-4',
                'task-5',
                'task-6',
                'task-7',
                'task-8',
            ]
        }
    },

    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2'],

    // default for state (mathsteps will validate equation and update this booleam)
    isEqSolutionCorrect: false,
    isEqSyntaxCorrect: false,
    areaSpace: 20
};

export default initialData;
