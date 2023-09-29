# Team TRA5H

Project created for the NYU Tandon's Haqathon, a hackathon focused on quantum computing. Our project is a web application that utilizes quantum algorithms combined with classical techniques to help push towards the development of sustainable, renewable energy and reduce carbon emissions. We will be using quantum phase estimation to greatly increase the efficiency of finding eigenvalues. We will then use these eigenvalues to find cliques and thus find the best areas to place renewable energy farms such as wind energy.

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