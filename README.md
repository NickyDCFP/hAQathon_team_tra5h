# Team TRA5H
Keywords: Quantum Spectral Graph Theory, Probabilistic Clique Finding, Variational Quantum Eigensolvers, Renewable Energy, Climate Week
Project created for the NYU Tandon's hAQathon, a hackathon focused on quantum computing for sustainiability. Our project is a web application that utilizes quantum algorithms combined with classical techniques to help push towards the development of sustainable, renewable energy and reduce carbon emissions. We will be using variational quantum eigensolvers to greatly increase the efficiency of finding eigenvalues. We will then use these eigenvalues to proboabilistically find cliques and thus find renewable energy hotspots and cold spots to encourage the redistribution of energy, as was mentioned as a major issue during NYC Climate Week 2023.

## Running Instructions

### If it is your first time:
First run (for the backend)
```
cd Backend
pip install -r requirements.txt
python server.py
```

Then you can run in a separate terminal (for the frontend)
```
cd Frontend
npm install
npm run dev
```

### Otherwise
First run (for the backend)
```
cd Backend
python server.py
```

Then you can run in a separate terminal (for the frontend)
```
cd Frontend
npm run dev
```

You then should be able to open up the project using your localhost browser.