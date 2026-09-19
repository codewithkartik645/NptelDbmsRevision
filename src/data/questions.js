// ============================================================================
// QUESTION DATA
//
// All 8 weeks below are transcribed directly from your uploaded NPTEL DBMS
// assignment PDFs (Assignments 1-8). Wording, options, and answers are kept
// exactly as given, except where noted inline.
//
// Schema:
// {
//   week: 1,
//   title: "Week 1",
//   topic: "short subtitle",
//   questions: [
//     {
//       id: "w1-q1",                      // unique across the whole file
//       type: "MCQ" | "MSQ",              // MCQ = single correct, MSQ = multi-select
//       question: "Question text. Use \n for line breaks (tables/schedules).",
//       options: ["...", "...", "...", "..."],
//       correctAnswers: ["...", ...],     // exact string(s) matching option(s)
//       explanation: "optional",
//       hinglishExplanation: "optional — Hindi+English mixed concept explainer"
//     }
//   ]
// }
//
// A question's `correctAnswers` is always an array — one entry for MCQ,
// two or more for MSQ. Scoring requires the selected set to exactly match.
//
// FLAGGED AMBIGUITIES (transcribed honestly rather than silently guessed):
// - Week 1, Q10: options (a) and (d) render as visually identical projection
//   expressions in the source PDF due to a symbol-extraction artifact. The
//   answer key itself (option c) is unambiguous and preserved correctly.
// - Week 7, Q3: the four answer choices were drawn as wait-for-graph
//   diagrams in the source PDF, not as text. The correct edge set (option c)
//   is preserved from the explanation; the three incorrect diagram options
//   have been redrawn as plausible edge-direction variants rather than
//   transcribed pixel-for-pixel, since the diagrams themselves aren't
//   recoverable as text.
// - Week 7, Q10: the schedule was a table image. The row-by-row sequence
//   below has been reconstructed from the worked explanation (which states
//   the read/write order explicitly), not copied directly from a table.
// - Week 8, Q5: the source PDF drew this as a transaction timeline diagram
//   (bars against Checkpoint 1 / Checkpoint 2 / System Failure). The
//   start/commit relationships for each transaction below are reconstructed
//   from the worked explanation and the diagram description, not copied
//   verbatim from a table.
// - Week 8, Q6: the source PDF drew two query-tree diagrams (Figure 1 /
//   Figure 2). The indented tree structure below reproduces the same
//   operations and nesting shown in those diagrams as text.
// ============================================================================

const rawWeeks = [
  {
    week: 1,
    title: "Week 1",
    topic: "Assignment 1 — DB abstraction, keys, relational algebra, SQL basics",
    questions: [
      {
        id: "w1-q1",
        type: "MCQ",
        question: "Which level of abstraction describes types of data that are stored in the Database?",
        options: ["Physical level", "Logical level", "View level", "Abstraction level"],
        correctAnswers: ["Logical level"],
        explanation:
          "There are three levels of abstraction. Physical level: the lowest level, describes how data is physically stored. Logical level: the middle level, describes which type of data is stored in the database. View level: the highest level, describes user interaction with the database system.",
        hinglishExplanation:
          "Yeh question DBMS ke 3 levels of abstraction ke baare mein hai. Physical level sabse niche hota hai — yaha data disk pe kaise store hota hai woh describe hota hai. Logical level middle mein hota hai — yaha yeh define hota hai ki database mein KAUN SI type ka data store hai (jaise tables, relationships). View level sabse upar hota hai — yeh define karta hai ki end-user database ko kaise dekhta/use karta hai. Question puch raha hai ki 'konsa type ka data store hai' yeh kaun describe karta hai — iska answer Logical level hai kyunki yeh 'data types' ko define karta hai, na ki physical storage ya user view ko.",
      },
      {
        id: "w1-q2",
        type: "MCQ",
        question:
          "Identify the valid primary key for the relation course_registration from the given instance.\n\ncourse_registration\nstudent_id | course_id | semester | grade\n101 | CS101 | 1 | A\n102 | CS101 | 1 | B\n101 | MA101 | 1 | A\n103 | CS101 | 2 | B\n102 | MA101 | 1 | A",
        options: ["student id", "course id", "student id, course id", "semester"],
        correctAnswers: ["student id, course id"],
        explanation:
          "A primary key must uniquely identify each record in a table. The combination of student_id and course_id uniquely identifies each tuple in the relation.",
        hinglishExplanation:
          "Question mein ek course_registration table diya hai jisme har row student aur unke course registration ko represent karta hai. Primary key woh column(s) hota hai jo har row ko UNIQUELY identify kare — matlab do rows kabhi same nahi honi chahiye us column mein. Yahan akela student_id repeat ho raha hai (101 do baar hai), aur akela course_id bhi repeat ho raha hai. Lekin jab hum student_id aur course_id dono ko combine karte hain, toh har combination unique ban jaata hai. Isliye composite key {student_id, course_id} hi sahi primary key hai.",
      },
      {
        id: "w1-q3",
        type: "MCQ",
        question: "Identify the correct statement/s.",
        options: [
          "Employee(empID, empName) is an instance of a relation schema.",
          "Employee(empID, empName) is an example of a physical schema.",
          "(5012, Ananya) is an instance of a relation schema.",
          "(5012, Ananya) is an example of a logical schema.",
        ],
        correctAnswers: ["(5012, Ananya) is an instance of a relation schema."],
        explanation: "(5012, Ananya) is an instance of the schema Employee(empID, empName).",
        hinglishExplanation:
          "Yeh question 'schema' aur 'instance' ke difference ko test kar raha hai. Schema matlab table ki STRUCTURE/design — jaise Employee(empID, empName) yeh ek schema hai, jo bata raha hai ki table mein kaun kaun se columns hain. Instance matlab actual DATA jo us schema ke andar store hota hai — jaise (5012, Ananya) yeh ek particular row/record hai jo Employee schema follow karta hai. Isliye (5012, Ananya) ko 'instance of relation schema' kaha jaayega, na ki schema khud.",
      },
      {
        id: "w1-q4",
        type: "MSQ",
        question:
          "Consider a relation BookStore(ISBN, Title, Price, Category) where the superkeys are as follows: {ISBN}, {ISBN, Title}, {Price, Category}, {Price, Category, Title}. Select the possible candidate key(s).",
        options: ["{ISBN}", "{Price}", "{Category}", "{Price, Category}"],
        correctAnswers: ["{ISBN}", "{Price, Category}"],
        explanation:
          "Minimal superkeys are candidate keys. ISBN alone is a superkey, so any superset of it is also a superkey, but only ISBN itself is minimal (a candidate key). Similarly, {Price, Category} is a superkey and is minimal, since removing either attribute breaks uniqueness — so it's also a candidate key.",
        hinglishExplanation:
          "Superkey woh set of attributes hota hai jo row ko uniquely identify kar sake — chahe usme extra unnecessary attributes bhi ho. Candidate key ek MINIMAL superkey hota hai — matlab agar usme se koi bhi attribute hata do toh woh unique identify karna band kar dega. {ISBN} akela superkey hai aur minimal bhi hai, isliye candidate key hai. {Price, Category} bhi ek superkey hai aur agar inme se ek bhi hata do toh unique nahi rahega, isliye yeh bhi minimal hai — candidate key hai. Lekin akela {Price} ya {Category} superkeys ki list mein diye hi nahi gaye the, isliye woh candidate keys nahi ho sakte.",
      },
      {
        id: "w1-q5",
        type: "MCQ",
        question:
          "Consider the following relations:\nArticle(AID, Title, Citations)\nArticleTag(AID, Tag)\n\nWhat does the following relational algebra expression represent?\nΠAID( (σCitations>50 Article) ⋈ (σTag='AI' ArticleTag) )",
        options: [
          "Find the AID of all Article with more than 50 Citations.",
          "Find the AID of all Article with more than 50 Citations or are of Tag 'AI'.",
          "Find the AID of all Article with more than 50 Citations but are not of Tag 'AI'.",
          "Find the AID of all Article with more than 50 Citations and are of Tag 'AI'.",
        ],
        correctAnswers: ["Find the AID of all Article with more than 50 Citations and are of Tag 'AI'."],
        explanation:
          "The selection conditions are applied on both relations, then a join is performed, and finally a projection on AID is taken. So only articles satisfying both conditions (Citations > 50 and Tag = 'AI') are returned.",
        hinglishExplanation:
          "Yeh relational algebra expression do steps mein kaam karta hai: pehle dono relations pe SELECTION lagayi gayi hai (Article mein Citations>50 wale rows, aur ArticleTag mein Tag='AI' wale rows), fir dono ko JOIN kiya gaya hai (common AID pe match karna), aur last mein sirf AID column PROJECT kiya gaya hai. Toh jo bhi article dono conditions satisfy karta hai — Citations 50 se zyada AUR Tag 'AI' hai — uska hi AID final answer mein aayega. Isliye yeh 'AND' (dono condition) wala case hai, 'OR' wala nahi.",
      },
      {
        id: "w1-q6",
        type: "MCQ",
        question:
          "Consider the following SQL statement(s):\n\nS1:\nINSERT INTO orders(order_id, customer_id, order_date)\nVALUES (501, 2001, '2026-06-10');\n\nS2:\nALTER TABLE orders ADD COLUMN total_amount number(10, 2);\n\nIdentify the correct statement.",
        options: [
          "Both S1 and S2 are Data Manipulation (DML) Queries",
          "S1 is a Data Manipulation (DML) Query, and S2 is a Data Definition (DDL) Query",
          "Both S1 and S2 are Data Definition (DDL) Queries",
          "S1 is a Data Control Query, and S2 is a Data Definition (DDL) Query",
        ],
        correctAnswers: ["S1 is a Data Manipulation (DML) Query, and S2 is a Data Definition (DDL) Query"],
        explanation:
          "DDL (Data Definition Language) includes CREATE, DROP, ALTER, TRUNCATE, RENAME. DML (Data Manipulation Language) includes INSERT, UPDATE, DELETE.",
        hinglishExplanation:
          "SQL commands do main categories mein baante jaate hain: DDL (Data Definition Language) jo table ki STRUCTURE change karta hai — jaise CREATE, ALTER, DROP. DML (Data Manipulation Language) jo table ke andar ka DATA change karta hai — jaise INSERT, UPDATE, DELETE. S1 ek INSERT statement hai jo naya row daal raha hai, isliye yeh DML hai. S2 ek ALTER TABLE statement hai jo naya column add kar raha hai, matlab structure change ho raha hai, isliye yeh DDL hai.",
      },
      {
        id: "w1-q7",
        type: "MCQ",
        question:
          "Consider the following instance of the Department(DeptID, DeptName) relation:\nDeptID | DeptName\nD101 | Computer Science\nD102 | Electronics\n\nIf DeptID is the foreign key in the relational schema EmployeeAllocation(AllocationID, DeptID, EmployeeName), which of the following is a valid instance of EmployeeAllocation?",
        options: [
          "a) AllocationID | DeptID | EmployeeName\nA001 | D101 | Amit\nA002 | D105 | Raj",
          "b) AllocationID | DeptID | EmployeeName\nA001 | D101 | Amit\nA001 | D102 | Raj",
          "c) AllocationID | DeptID | EmployeeName\nNULL | D102 | Amit\nA003 | D102 | Raj",
          "d) AllocationID | DeptID | EmployeeName\nA001 | D101 | Amit\nA002 | D102 | Raj",
        ],
        correctAnswers: ["d) AllocationID | DeptID | EmployeeName\nA001 | D101 | Amit\nA002 | D102 | Raj"],
        explanation:
          "Option (a) is invalid — DeptID 'D105' does not exist in Department. Option (b) is invalid — AllocationID 'A001' repeats, violating the primary key. Option (c) is invalid — a primary key value cannot be NULL. Option (d) is a valid instance.",
        hinglishExplanation:
          "Yeh question Foreign Key constraint ko test kar raha hai. Rule hota hai: jo value tum child table (EmployeeAllocation) mein daal rahe ho, woh parent table (Department) mein already exist honi chahiye. Option (a) galat hai kyunki D105 Department table mein hai hi nahi. Option (b) galat hai kyunki AllocationID (jo primary key hai) do baar A001 repeat ho raha hai — primary key kabhi duplicate nahi ho sakta. Option (c) galat hai kyunki primary key kabhi NULL nahi ho sakta. Sirf option (d) mein saari values valid hain.",
      },
      {
        id: "w1-q8",
        type: "MCQ",
        question:
          "Consider the following table:\nRegionStats\nRegionName | Population | Country\nTexas | 70000 | USA\nCalifornia | 80000 | USA\nOntario | 50000 | Canada\nQuebec | 45000 | Canada\nBavaria | 30000 | Germany\nFlorida | 60000 | USA\n\nIdentify the correct operation(s) that produce the following output from the above relation:\nRegionName | Population | Country\nTexas | 70000 | USA\nCalifornia | 80000 | USA\nOntario | 50000 | Canada\nFlorida | 60000 | USA",
        options: [
          "σ(Population≥50000)(RegionStats)",
          "σ(Population>60000)(RegionStats)",
          "σ(Population≥50000 ∧ Country='Canada')(RegionStats)",
          "σ(Population≥80000)(RegionStats)",
        ],
        correctAnswers: ["σ(Population≥50000)(RegionStats)"],
        explanation: "This selects all regions with population greater than or equal to 50000.",
        hinglishExplanation:
          "Yahan humein woh rows chahiye jinka Population 50000 ya usse zyada hai (Texas, California, Ontario, Florida — Quebec aur Bavaria exclude honge). Relational algebra mein 'σ' (sigma) SELECTION operator hota hai jo condition ke basis pe rows filter karta hai. Toh σ(Population≥50000) exactly wahi rows return karega jo humein chahiye — extra AND condition (jaise Country='Canada') lagane se sirf Canada wali rows aayengi jo galat hai.",
      },
      {
        id: "w1-q9",
        type: "MCQ",
        question:
          "Consider the following tables:\nRegionStats1\nRegionName | Population | Country\nTexas | 70000 | USA\nCalifornia | 80000 | USA\nOntario | 50000 | Canada\nQuebec | 45000 | Canada\n\nRegionStats2\nRegionName | Population | Country\nTexas | 70000 | USA\nBavaria | 30000 | Germany\nOntario | 50000 | Canada\nFlorida | 60000 | USA\n\nIdentify the correct operation(s) which produce the following output from the above two relations:\nRegionName | Population | Country\nTexas | 70000 | USA\nOntario | 50000 | Canada",
        options: [
          "RegionStats1 − RegionStats2",
          "RegionStats1 ∩ RegionStats2",
          "RegionStats2 − RegionStats1",
          "RegionStats1 ∪ RegionStats2",
        ],
        correctAnswers: ["RegionStats1 ∩ RegionStats2"],
        explanation: "The result represents the intersection of RegionStats1 and RegionStats2.",
        hinglishExplanation:
          "Dono tables RegionStats1 aur RegionStats2 mein COMMON rows chahiye — jo dono mein hi present hon. Yeh exactly INTERSECTION (∩) ka kaam hai. Texas aur Ontario dono tables mein same values ke saath present hain, isliye yeh answer mein aayenge. Minus (−) operator sirf ek table mein present rows dega jo doosre mein nahi hain — jo humein nahi chahiye yahan.",
      },
      {
        id: "w1-q10",
        type: "MCQ",
        question:
          "Consider the following table:\nRegionStats\nRegionName | Population | Country\nTexas | 70000 | USA\nCalifornia | 80000 | USA\nOntario | 50000 | Canada\nQuebec | 45000 | Canada\nBavaria | 30000 | Germany\nFlorida | 60000 | USA\n\nIdentify the correct operation(s) that produce the following output from the above relation:\nFilteredRegionStats\nRegionName | Country\nTexas | USA\nCalifornia | USA\nOntario | Canada\nFlorida | USA",
        options: [
          "a) Π(RegionName, Country)(RegionStats)",
          "b) σ(Population≥50000)(RegionStats)",
          "c) Π(RegionName, Country)( σ(Population≥50000)(RegionStats) )",
          "d) Π(RegionName, Country)(RegionStats)",
        ],
        correctAnswers: ["c) Π(RegionName, Country)( σ(Population≥50000)(RegionStats) )"],
        explanation:
          "Option (c) first applies the selection σ(Population≥50000) to filter tuples, then projects RegionName and Country, matching the desired output. (Flagged: options a and d appear textually identical in the source PDF due to a symbol-extraction artifact — this doesn't affect the answer key, which is unambiguously option c.)",
        hinglishExplanation:
          "Yahan do steps chahiye: pehle SELECTION (σ) se sirf Population≥50000 wali rows filter karo, fir PROJECTION (Π) se sirf RegionName aur Country columns nikaalo. Agar sirf projection karoge (bina selection ke) toh saari rows aa jaayengi jo galat hai. Isliye sahi order hai: pehle filter, phir columns select.",
      },
    ],
  },
  {
    week: 2,
    title: "Week 2",
    topic: "Assignment 2 — SQL DML/DDL, joins, views, subqueries, indexes",
    questions: [
      {
        id: "w2-q1",
        type: "MCQ",
        question:
          "In an e-commerce system, the instance of CustomerOrders is as follows:\nCustomerOrders\nOrderID | CustomerID | ItemCount\nO101 | C001 | 3\nO102 | C002 | 2\nO103 | C003 | 5\nO104 | C004 | 1\nO105 | C005 | 4\n\nFor the given instance, the ItemCount values need to be updated by decreasing 1 for those entries where the current values are greater than 2. What is the correct SQL query for updating the current instance?",
        options: [
          "MODIFY CustomerOrders ItemCount=ItemCount-1 WHERE ItemCount>2;",
          "UPDATE CustomerOrders SET ItemCount=ItemCount-1 WHERE ItemCount>2;",
          "UPDATE CustomerOrders ItemCount=ItemCount-1 WHERE ItemCount>2;",
          "ALTER CustomerOrders SET ItemCount=ItemCount-1 WHERE ItemCount>2;",
        ],
        correctAnswers: ["UPDATE CustomerOrders SET ItemCount=ItemCount-1 WHERE ItemCount>2;"],
        explanation:
          "To update existing values, SQL uses UPDATE ... SET ... WHERE .... Only this option correctly updates tuples where ItemCount > 2.",
        hinglishExplanation:
          "SQL mein existing data change karne ke liye UPDATE statement use hota hai, jiska syntax hai: UPDATE table SET column=value WHERE condition. 'MODIFY' aur 'ALTER' yeh dono commands table ki STRUCTURE change karne ke liye hote hain, DATA change karne ke liye nahi. Isliye sirf 'UPDATE ... SET ... WHERE' wala option hi syntactically correct hai jo ItemCount ko 1 kam karega jaha ItemCount already 2 se zyada hai.",
      },
      {
        id: "w2-q2",
        type: "MCQ",
        question:
          "Consider the following instance of table:\nEmployeeDetails\nEmpName | DeptName | City | Salary\nAmit | HR | Kolkata | 60000\nAmit | Sales | Kolkata | 60000\nRiya | HR | Delhi | 50000\nRiya | Finance | Delhi | 50000\nSourav | Sales | Kolkata | 70000\n\nIdentify the correct CREATE statement for this table.",
        options: [
          "CREATE TABLE EmployeeDetails (EmpName varchar(255) NOT NULL, DeptName varchar(255) NOT NULL, City varchar(255), Salary int, PRIMARY KEY (EmpName));",
          "CREATE TABLE EmployeeDetails (EmpName varchar(255) NOT NULL, DeptName varchar(255) NOT NULL, City varchar(255), Salary int, PRIMARY KEY (EmpName, DeptName));",
          "CREATE TABLE EmployeeDetails (EmpName varchar(255), DeptName varchar(255) NOT NULL, City varchar(255), Salary int, PRIMARY KEY (DeptName));",
          "CREATE TABLE EmployeeDetails (EmpName varchar(255) NOT NULL, DeptName varchar(255) NOT NULL, City varchar(255), Salary int, PRIMARY KEY (EmpName, City));",
        ],
        correctAnswers: [
          "CREATE TABLE EmployeeDetails (EmpName varchar(255) NOT NULL, DeptName varchar(255) NOT NULL, City varchar(255), Salary int, PRIMARY KEY (EmpName, DeptName));",
        ],
        explanation:
          "EmpName alone can't be a key (Amit and Riya each repeat). DeptName alone can't be a key (HR, Sales repeat). (EmpName, City) isn't a key either — (Amit, Kolkata) repeats. But every (EmpName, DeptName) pair is unique, so it can be the primary key.",
        hinglishExplanation:
          "Table mein dekhne se pata chalta hai ki akela EmpName repeat ho raha hai (Amit do baar), akela DeptName bhi repeat ho raha hai (HR do baar). Lekin jab EmpName aur DeptName dono ko combine karte hain, har combination unique hai. Isliye composite primary key PRIMARY KEY(EmpName, DeptName) hi sahi hoga.",
      },
      {
        id: "w2-q3",
        type: "MCQ",
        question:
          "Consider the following two tables representing a book store system:\nSalesRecords\nSaleID | BookID | Quantity\nS101 | B001 | 5\nS102 | B003 | 2\nS103 | B002 | 7\nS104 | B001 | 1\n\nBookCatalog\nBookID | Category\nB001 | Fiction\nB002 | Science\nB003 | Fiction\n\nWhat is the output of the following SQL query?\nSELECT Category, SUM(Quantity)\nFROM SalesRecords, BookCatalog\nWHERE SalesRecords.BookID = BookCatalog.BookID\nGROUP BY Category;",
        options: ["Fiction: 8, Science: 7", "Fiction: 6, Science: 7", "Fiction: 9, Science: 7", "Fiction: 8, Science: 6"],
        correctAnswers: ["Fiction: 8, Science: 7"],
        explanation:
          "After the inner join on BookID and grouping by Category: Fiction rows have Quantity 5, 2, 1 (sum 8); Science has Quantity 7.",
        hinglishExplanation:
          "Yeh query pehle SalesRecords aur BookCatalog ko BookID pe JOIN karti hai, taaki har sale ke saath uski Category pata chal jaaye. Fir GROUP BY Category se sab Fiction wale rows ek group mein aur Science wale doosre group mein aa jaate hain, aur SUM(Quantity) se har group ki total quantity nikalti hai. Fiction ke rows hain 5,2,1 (total=8), Science ka ek row hai 7. Isliye final answer 'Fiction: 8, Science: 7' hai.",
      },
      {
        id: "w2-q4",
        type: "MCQ",
        question:
          "Consider the following instance InventoryDetails of an e-commerce application:\nInventoryDetails\nProductID | Name | Price | Category\nP001 | Laptop | 50000 | Electronics\nP002 | Mobile | 20000 | Electronics\nP003 | Shoes | 3000 | Footwear\nP004 | Watch | 1500 | Accessories\nP005 | Shirt | 800 | Clothing\n\nIdentify the correct statement to create a VIEW on the InventoryDetails table to retrieve Name and Price of all products in the Electronics category, and name the view as Electronics_Products:",
        options: [
          "Create Electronics_Products AS SELECT Name, Price FROM InventoryDetails WHERE Category = 'Electronics';",
          "Create view Electronics_Products ON InventoryDetails SELECT Name, Price WHERE Category = 'Electronics';",
          "Create view Electronics_Products TO InventoryDetails SELECT Name, Price WHERE Category = 'Electronics';",
          "Create view Electronics_Products AS SELECT Name, Price FROM InventoryDetails WHERE Category = 'Electronics';",
        ],
        correctAnswers: [
          "Create view Electronics_Products AS SELECT Name, Price FROM InventoryDetails WHERE Category = 'Electronics';",
        ],
        explanation:
          "The correct syntax is: CREATE VIEW viewname AS SELECT column1, column2, ... FROM tablename WHERE condition;",
        hinglishExplanation:
          "VIEW ek 'virtual table' hota hai jo kisi query ke result ko represent karta hai. Uska syntax hota hai: CREATE VIEW viewname AS SELECT ... FROM ... WHERE .... Yaha humein sirf Electronics category ke Name aur Price chahiye, toh sahi syntax hoga: CREATE VIEW Electronics_Products AS SELECT Name, Price FROM InventoryDetails WHERE Category='Electronics'.",
      },
      {
        id: "w2-q5",
        type: "MCQ",
        question:
          "Consider the following table for a ride-sharing application:\nCabDriverInfo\nDriverID | Location\nD001 | Bangalore\nD002 | Hyderabad\nD003 | Chennai\nD004 | Pune\nD005 | Bhopal\nD006 | Delhi\n\nWhich of the following options will be present in the output generated by the SQL query:\nSELECT Location FROM CabDriverInfo WHERE Location LIKE 'B%' AND Location LIKE '%e';",
        options: ["Bhopal", "Pune", "Hyderabad", "Bangalore"],
        correctAnswers: ["Bangalore"],
        explanation:
          "Location LIKE 'B%' matches locations starting with B: Bangalore, Bhopal. Location LIKE '%e' keeps only those ending in 'e'. Only Bangalore satisfies both.",
        hinglishExplanation:
          "'%' wildcard kisi bhi length ke characters ko represent karta hai. 'B%' ka matlab hai naam 'B' se start ho — Bangalore aur Bhopal dono match karte hain. '%e' ka matlab hai naam 'e' pe end ho. In dono conditions ko AND se combine karne par sirf woh naam bachega jo B se start AUR e se end ho. Bangalore isse match karta hai, lekin Bhopal 'l' pe end hota hai isliye match nahi karta.",
      },
      {
        id: "w2-q6",
        type: "MCQ",
        question:
          "Consider the two instances:\nPurchaseRecords\nOrderID | ProductID | Quantity\nO001 | P001 | 10\nO002 | P002 | 5\nO003 | P003 | 8\nO004 | P002 | 3\n\nInventoryCatalog\nProductID | ProductName\nP001 | Laptop\nP002 | Mouse\nP003 | Keyboard\n\nWhich of the following relational algebra operations will generate the following output:\nOrderID | ProductID | Quantity | ProductName\nO001 | P001 | 10 | Laptop\nO002 | P002 | 5 | Mouse\nO003 | P003 | 8 | Keyboard\nO004 | P002 | 3 | Mouse",
        options: [
          "PurchaseRecords NATURAL JOIN InventoryCatalog",
          "PurchaseRecords LEFT OUTER JOIN InventoryCatalog",
          "PurchaseRecords RIGHT OUTER JOIN InventoryCatalog",
          "PurchaseRecords EQUI JOIN InventoryCatalog ON PurchaseRecords.ProductID=InventoryCatalog.ProductID",
        ],
        correctAnswers: ["PurchaseRecords NATURAL JOIN InventoryCatalog"],
        explanation:
          "A NATURAL JOIN combines tuples using attributes with the same name (here, ProductID) and keeps one copy of it. An EQUI JOIN also joins on equality but retains both compared attributes.",
        hinglishExplanation:
          "NATURAL JOIN automatically un columns pe match karta hai jinka NAAM same hota hai dono tables mein — yahan woh column hai ProductID. Yeh common column ka sirf ek copy result mein rakhta hai. EQUI JOIN bhi equality pe match karta hai lekin dono tables ke compared columns ko alag-alag rakhta hai (duplicate column aa sakta hai). Isliye NATURAL JOIN hi sahi answer hai.",
      },
      {
        id: "w2-q7",
        type: "MCQ",
        question:
          "Consider the following instance of EmployeeDetails(EmpName, DeptName, City, Salary) relation.\nEmployeeDetails\nEmpName | DeptName | City | Salary\nAmit | HR | Kolkata | 60000\nRiya | HR | Delhi | 50000\nSourav | Sales | Kolkata | 70000\nNeha | Sales | Mumbai | 45000\nRahul | Finance | Chennai | 40000\nPuja | Admin | Bangalore | 60000\n\nIdentify the correct statement(s) to get the following output:\nEmpName | DeptName | City | Salary\nAmit | HR | Kolkata | 60000\nSourav | Sales | Kolkata | 70000\nNeha | Sales | Mumbai | 45000\nPuja | Admin | Bangalore | 60000",
        options: [
          "SELECT * FROM EmployeeDetails WHERE Salary>=60000;",
          "SELECT * FROM EmployeeDetails WHERE DeptName='Sales';",
          "SELECT * FROM EmployeeDetails WHERE Salary>=60000 AND DeptName='Sales';",
          "SELECT * FROM EmployeeDetails WHERE Salary>=60000 OR DeptName='Sales';",
        ],
        correctAnswers: ["SELECT * FROM EmployeeDetails WHERE Salary>=60000 OR DeptName='Sales';"],
        explanation: "The output contains tuples where Salary ≥ 60000 OR DeptName = 'Sales'.",
        hinglishExplanation:
          "Output table mein Amit (Salary=60000), Sourav (70000), Neha (45000, Sales dept), aur Puja (60000) hain. Neha ki salary 60000 se kam hai lekin woh Sales department mein hai. Isliye yeh sirf 'Salary>=60000' condition se nahi aa sakti, aur sirf 'DeptName=Sales' se Amit/Puja miss ho jaayenge. Dono conditions ko OR se jodne par — jo bhi Salary>=60000 HO YA Sales department mein ho — dono set of rows mil jaate hain.",
      },
      {
        id: "w2-q8",
        type: "MCQ",
        question:
          "Consider the following instance of EmployeeDetails(EmpName, DeptName, City, Salary) relation.\nEmployeeDetails\nEmpName | DeptName | City | Salary\nAmit | HR | Kolkata | 60000\nRiya | HR | Delhi | 50000\nSourav | Sales | Kolkata | 70000\nNeha | Sales | Mumbai | 45000\nRahul | Finance | Chennai | 40000\nPuja | Admin | Bangalore | 60000\n\nIdentify the correct SQL command to find the average salary of employees in the HR department.",
        options: [
          "SELECT avg(Salary) FROM EmployeeDetails;",
          "SELECT * FROM EmployeeDetails WHERE DeptName='HR' AND avg(Salary);",
          "SELECT * FROM EmployeeDetails WHERE DeptName='HR' OR avg(Salary);",
          "SELECT avg(Salary) FROM EmployeeDetails WHERE DeptName='HR';",
        ],
        correctAnswers: ["SELECT avg(Salary) FROM EmployeeDetails WHERE DeptName='HR';"],
        explanation: "avg(Salary) computes the average; WHERE DeptName='HR' restricts it to the HR department.",
        hinglishExplanation:
          "AVG() ek aggregate function hai jo average nikalta hai. Humein sirf HR department ke employees ka average salary chahiye, poore table ka nahi. Isliye WHERE clause zaroori hai taaki sirf HR wale rows par calculation ho. Agar WHERE clause hata do toh poore table ka average aa jaayega jo galat hoga.",
      },
      {
        id: "w2-q9",
        type: "MCQ",
        question:
          "Consider the following instance of EmployeeDetails(EmpName, DeptName, City, Salary) relation.\nEmployeeDetails\nEmpName | DeptName | City | Salary\nAmit | HR | Kolkata | 60000\nRiya | HR | Delhi | 50000\nSourav | Sales | Kolkata | 70000\nNeha | Sales | Mumbai | 45000\nRahul | Finance | Chennai | 40000\nPuja | Admin | Bangalore | 60000\n\nIdentify the correct statement(s) to find the EmpName and City whose Salary is greater than the salary of all employees in the 'HR' department.",
        options: [
          "SELECT EmpName, City FROM EmployeeDetails WHERE Salary > (SELECT Salary FROM EmployeeDetails WHERE DeptName='HR');",
          "SELECT EmpName, City FROM EmployeeDetails WHERE Salary > ALL (SELECT Salary FROM EmployeeDetails WHERE DeptName='HR');",
          "SELECT EmpName, City FROM EmployeeDetails WHERE Salary > ANY (SELECT Salary FROM EmployeeDetails WHERE DeptName='HR');",
          "SELECT EmpName, City FROM EmployeeDetails WHERE Salary >= ALL (SELECT Salary FROM EmployeeDetails WHERE DeptName='HR');",
        ],
        correctAnswers: [
          "SELECT EmpName, City FROM EmployeeDetails WHERE Salary > ALL (SELECT Salary FROM EmployeeDetails WHERE DeptName='HR');",
        ],
        explanation:
          "ALL returns TRUE only if the comparison holds for every value from the subquery. Option (a) is invalid since the subquery returns multiple rows. Option (c)'s ANY only checks at least one HR salary. Option (d)'s >= ALL would incorrectly include the salary equal to the highest HR salary.",
        hinglishExplanation:
          "'> ALL (subquery)' ka matlab hota hai — value subquery ke SAARE results se bada hona chahiye. Yahan humein aise employees chahiye jinki salary HR department ke SABSE bade salary se bhi zyada ho. '> ANY' sirf ek se bhi bada hone par match karta hai (weaker condition), jo galat hai. '>= ALL' galat hai kyunki woh HR ke maximum salary ke barabar wale ko bhi include kar lega, jabki humein STRICTLY zyada chahiye.",
      },
      {
        id: "w2-q10",
        type: "MCQ",
        question:
          "Consider the following instance of table EmployeeDetails:\nEmpName | DeptName | City | Salary\nAmit | HR | Kolkata | 60000\nRiya | HR | Delhi | 50000\nSourav | Sales | Kolkata | 70000\nNeha | Sales | Mumbai | 45000\nRahul | Finance | Chennai | 40000\nPuja | Admin | Bangalore | 60000\n\nThe database administrator frequently executes queries that search employees based on their department name. Identify the correct SQL statement to create an index named idx_dept on the DeptName attribute of the EmployeeDetails table.",
        options: [
          "CREATE INDEX idx_dept ON EmployeeDetails(DeptName);",
          "CREATE INDEX idx_dept FROM EmployeeDetails(DeptName);",
          "CREATE TABLE idx_dept ON EmployeeDetails(DeptName);",
          "CREATE INDEX EmployeeDetails ON idx_dept(DeptName);",
        ],
        correctAnswers: ["CREATE INDEX idx_dept ON EmployeeDetails(DeptName);"],
        explanation: "The correct syntax is: CREATE INDEX index_name ON table_name(column_name);",
        hinglishExplanation:
          "Jab hum kisi column pe baar baar search karte hain (yaha DeptName), toh us column pe INDEX banane se searches fast ho jaati hain — jaise kisi kitaab ka index page. Syntax hota hai: CREATE INDEX index_name ON table_name(column_name).",
      },
    ],
  },
  {
    week: 3,
    title: "Week 3",
    topic: "Assignment 3 — Relational algebra/calculus, ER diagrams, triggers, embedded SQL",
    questions: [
      {
        id: "w3-q1",
        type: "MCQ",
        question:
          "Consider the following instance of a relation Uniform:\nSchool | Color\nEduSys | Red\nAPL | Green\nKidSys | Green\nGlobalEd | Blue\nLPInternational | Blue\nEduSys | White\n\nHow many tuples will be returned by the following Relational Algebra Query?\n((σ(School='KidSys' ∨ Color='Blue') Uniform) ÷ Π(Color)(σ(Color='Blue') Uniform)) ∪ Π(School)(σ(Color='White') Uniform)",
        options: ["4", "3", "2", "1"],
        correctAnswers: ["3"],
        explanation:
          "The division part produces the schools whose uniform colors are blue (2 tuples). Π(School)(σ(Color='White')Uniform) produces the school with white uniform (1 tuple). Union gives 3 tuples total.",
        hinglishExplanation:
          "Yeh ek complex relational algebra query hai jisme DIVISION (÷) aur UNION (∪) dono use ho rahe hain. Division operator un schools ko dhoondta hai jinke SAARE 'Blue' colors match karte hain (GlobalEd aur LPInternational) — yeh 2 tuples deta hai. Doosra part sirf White color wale school (EduSys) nikalta hai — yeh 1 tuple hai. In dono results ka UNION lene par total 3 unique tuples milte hain.",
      },
      {
        id: "w3-q2",
        type: "MCQ",
        question:
          "In a company, a Handicraft is made by multiple Artisans and an Artisan makes multiple Handicrafts. The Handicrafts are identified by their unique Tags. A Handicraft is made of a particular Material and is multi-colored. An Artisan has a unique ID. Assuming there is a Creates relation between Handicraft and Artisan, what will be the correct schema for Creates and Handicraft?",
        options: [
          "Creates(Tag, ID)\nHandicraft(Tag, Material, Color)",
          "Creates(ID)\nHandicraft(Tag, Material)\nHandicraft_color(Tag, Color)",
          "Creates(Tag, ID, Color)\nHandicraft(Tag, Material)",
          "Creates(Tag, ID)\nHandicraft(Tag, Material)\nHandicraft_color(Tag, Color)",
        ],
        correctAnswers: ["Creates(Tag, ID)\nHandicraft(Tag, Material)\nHandicraft_color(Tag, Color)"],
        explanation:
          "In a many-to-many relationship, Creates should have the primary keys of the participating entities. Since Color is multivalued, a separate schema Handicraft_color must be created.",
        hinglishExplanation:
          "Yeh ek Many-to-Many relationship ka case hai (Artisan multiple Handicraft banata hai, aur ek Handicraft multiple Artisans bana sakte hain). M:N relationship ko convert karne ke liye ek NAYI relation banani padti hai jisme dono entities ki primary keys ho — yaha Creates(Tag, ID). Color EK MULTIVALUED attribute hai, aur multivalued attributes ke liye ALAG SE ek relation banani padti hai — Handicraft_color(Tag, Color).",
      },
      {
        id: "w3-q3",
        type: "MSQ",
        question:
          "Consider the following Entity Relationship Diagram:\n\nContact(Name, Number) --- Maintains --- User(ID, UName)\nContact is a superclass (ISA) of Personal(Social_site) and Professional(Email) — both subtypes inherit Contact's attributes.\n\nIf n[Contact] is the number of attributes present in the relational schema of Contact, n[Personal] is the number of attributes present in the relational schema of Personal, and n[Professional] is the number of attributes present in the relational schema of Professional, which of the following options can NOT be true?",
        options: ["n[Contact] = 2", "n[Personal] = 1", "n[Professional] = 1", "n[Professional] = 3"],
        correctAnswers: ["n[Personal] = 1", "n[Professional] = 1"],
        explanation:
          "Method 1 (each subtype gets only its key + extra attribute): Contact(Name, Number); Personal(Number, Social_site); Professional(Number, Email) → n[Personal]=n[Professional]=2.\nMethod 2 (each subtype inherits all superclass attributes too): Contact(Name, Number); Personal(Name, Number, Social_site); Professional(Name, Number, Email) → n[Contact]=2, n[Personal]=n[Professional]=3.\nIn both valid designs, n[Personal] and n[Professional] are always 2 or 3, never 1 — so (b) and (c) can NOT be true.",
        hinglishExplanation:
          "Yeh ER diagram mein ISA (specialization) hierarchy hai: Contact ek supertype hai jiske do subtypes hain — Personal aur Professional. ER ko relational schema mein convert karne ke do tareeke ho sakte hain: (1) sirf key + extra attribute rakho har subtype mein (2 attributes), ya (2) supertype ke SAARE attributes bhi copy kar do (3 attributes). In dono valid designs mein subtype ke attributes hamesha 2 ya 3 hi ho sakte hain — kabhi bhi sirf 1 nahi ho sakta.",
      },
      {
        id: "w3-q4",
        type: "MSQ",
        question:
          "Consider the following Entity Relationship Diagram:\n\nWindows(Count, GlassType) --- Room_Win ---> Room(RNo, BedCount, WallColor, DecorType)\nOccupant(OID, FamCount, Phone) --- Room_Occ --- Room\nRoom has total participation (double line) in Room_Occ; Occupant is a weak entity related to Room via Room_Occ.\n\nWhich of the following options is (are) true?",
        options: [
          "Participation of Occupant is total in Room_Occ.",
          "The primary key in the relational schema for Windows will be {Count, GlassType}.",
          "The primary key in the relational schema for Room_Occ will be {RNo, OID}.",
          "Participation of Room is partial in Room_Occ.",
        ],
        correctAnswers: [
          "The primary key in the relational schema for Room_Occ will be {RNo, OID}.",
          "Participation of Room is partial in Room_Occ.",
        ],
        explanation:
          "Total participation is identified by a double line. The primary key of a many-to-many relation is composed of its participating entities' primary keys. The primary key of a weak entity set contains the primary key of its identifying entity set.",
        hinglishExplanation:
          "Yeh ER diagram mein Occupant ek WEAK ENTITY hai jo Room par depend karta hai. Weak entity ki primary key mein uski OWN partial key + identifying entity (Room) ki primary key dono hote hain — isliye Room_Occ ka primary key {RNo, OID} hoga. Diagram mein double line TOTAL participation dikhata hai aur single line PARTIAL participation — Room ka participation Room_Occ mein PARTIAL hai (Occupant ka total hai).",
      },
      {
        id: "w3-q5",
        type: "MCQ",
        question:
          "Consider the relation Singer(SID, Genres, Experience, discography). What is the Tuple Relational Calculus expression equivalent to the statement \"Select those Singer IDs (SID) whose Experiences are more than 20 years\"?",
        options: [
          "{<t> | ∃ p,t ∈ Singer (t[Genres]=p[Genres] ∨ p[Experience]=20)}",
          "{<t> | ∃ p,t ∈ Singer (t[SID]=p[SID] ∨ p[Experience]>20)}",
          "{t | ∃p ∈ Singer (t[Experience]=p[Experience] ∧ p[Singer]>20)}",
          "{t | ∃p ∈ Singer (t[SID]=p[SID] ∧ p[Experience]>20)}",
        ],
        correctAnswers: ["{t | ∃p ∈ Singer (t[SID]=p[SID] ∧ p[Experience]>20)}"],
        explanation: "This is the correct Tuple Relational Calculus syntax and semantics for the given statement.",
        hinglishExplanation:
          "Tuple Relational Calculus mein hum yeh describe karte hain ki 'kaunse tuples chahiye' bina yeh bataye ki 'kaise nikalna hai'. Yahan humein Singer table se woh tuples chahiye jinka Experience 20 se zyada ho. Sahi syntax: {t | ∃p ∈ Singer (t[SID]=p[SID] ∧ p[Experience]>20)} — matlab 'woh tuple t jiske liye Singer table mein koi p exist kare jiska SID same ho AUR Experience 20 se zyada ho'.",
      },
      {
        id: "w3-q6",
        type: "MCQ",
        question:
          "Consider the Entity Relationship diagram:\n\nANIMALS(SCNAME, LOCATION) specializes into OMNIVORES(HABITAT), CARNIVORES(FOODCHOICE), and HERBIVORES(USE).\nCARNIVORES further specializes into DOGS(BREED).\n\nWhich of the following statement(s) is/are TRUE?",
        options: [
          "DOGS inherit the attributes of CARNIVORES but not of ANIMALS.",
          "DOGS inherit the attributes of CARNIVORES and ANIMALS.",
          "CARNIVORES inherit the attributes of DOGS.",
          "ANIMALS inherit the attributes of CARNIVORES, OMNIVORES, HERBIVORES and DOGS.",
        ],
        correctAnswers: ["DOGS inherit the attributes of CARNIVORES and ANIMALS."],
        explanation: "According to the rule of specialization, a subtype inherits all attributes of its ancestor supertypes.",
        hinglishExplanation:
          "ER diagrams mein specialization hierarchy mein CHILD apne SAARE ANCESTORS (parents, grandparents) ke attributes INHERIT karta hai — reverse nahi hota. Yahan DOGS, CARNIVORES ka child hai, aur CARNIVORES, ANIMALS ka child hai. Isliye DOGS ko CARNIVORES ke attributes bhi milenge AUR ANIMALS ke attributes bhi milenge — dono.",
      },
      {
        id: "w3-q7",
        type: "MCQ",
        question:
          "Consider relation R = (A, B). Identify the correct relational-algebra expression equivalent to the following domain-relational-calculus expression: {<a> | ∃b (<a, b> ∈ r ∧ b = 15)}",
        options: ["Π(A)( σ(B=15)(r) )", "Π(B=15)(r)", "σ(B=15)(r)", "Π(A,B)( σ(A=15)(r) )"],
        correctAnswers: ["Π(A)( σ(B=15)(r) )"],
        explanation:
          "The expression means: there exists a tuple (a,b) in r such that b = 15, and we project attribute a from tuples satisfying that condition — i.e., Π(A)(σ(B=15)(r)).",
        hinglishExplanation:
          "Yeh expression keh raha hai: 'wo saare a values do jinke liye koi b exist kare jaha (a,b) relation r mein ho AUR b ki value 15 ho'. Iska matlab hai: pehle r mein sirf woh rows filter karo jinka B=15 hai (SELECTION), fir sirf attribute A ko nikaalo (PROJECTION). Isliye sahi expression: Π(A)(σ(B=15)(r)).",
      },
      {
        id: "w3-q8",
        type: "MCQ",
        question:
          "Consider the following relations:\nPresentation(P_no, Presenter, Time)\nSchedule(Topic, P_no)\n\nChoose the correct options based on the following SQL query:\nCREATE TRIGGER delete_trigger AFTER DELETE ON Presentation\nREFERENCING OLD ROW AS old_row\nFOR EACH ROW\nBEGIN\n  DELETE FROM Schedule\n  WHERE Schedule.Topic NOT IN\n    (SELECT Topic FROM Schedule WHERE P_no <> old_row.P_no)\nEND;",
        options: [
          "It is a trigger which is executed automatically upon deletion of a Presenter from Presentation relation and results in the deletion of the records from the Schedule relation.",
          "It is a trigger which is executed automatically upon deletion of a Topic from Schedule relation and results in the deletion of the records from the Presentation relation.",
          "It is a trigger which is executed automatically upon deletion of a Topic from Schedule relation only if P_no of Schedule relation does not present in the Presentation relation.",
          "It is a trigger which is executed automatically upon deletion of a Presenter from Presentation relation only if P_no of Presentation relation does not present in the Schedule relation.",
        ],
        correctAnswers: [
          "It is a trigger which is executed automatically upon deletion of a Presenter from Presentation relation and results in the deletion of the records from the Schedule relation.",
        ],
        explanation:
          "The trigger fires automatically upon deletion of a Presenter from Presentation. For each deleted Presenter, it checks if Schedule has any remaining Topic and, if so, deletes those row(s) from Schedule.",
        hinglishExplanation:
          "Yeh ek AFTER DELETE trigger hai jo Presentation table pe lagi hai — matlab jab bhi Presentation se ek row DELETE hoti hai, yeh trigger AUTOMATICALLY chal jaata hai. Trigger check karta hai ki deleted Presenter se related koi Topic Schedule mein kisi doosre Presentation se connected hai ya nahi — agar nahi, toh us Topic ko bhi delete kar deta hai.",
      },
      {
        id: "w3-q9",
        type: "MCQ",
        question:
          "Consider the relation GROCERY(ITEM, PRICE, MONTH). Select the SQL query within a host language, to find those ITEMS whose PRICE has exceeded the price stored in monthly_budget in a specific MONTH defined in target_month. monthly_budget and target_month are declared in host language.",
        options: [
          "EXEC SQL DECLARE c CURSOR FOR SELECT ITEM FROM GROCERY WHERE PRICE > monthly_budget AND MONTH = target_month END_EXEC",
          "EXEC SQL DECLARE c CURSOR FOR SELECT ITEM FROM GROCERY WHERE PRICE > monthly_budget AND MONTH = :target_month END_EXEC",
          "EXEC SQL DECLARE c CURSOR FOR SELECT ITEM FROM GROCERY WHERE PRICE > :monthly_budget END_EXEC",
          "EXEC SQL DECLARE c CURSOR FOR SELECT ITEM FROM GROCERY WHERE PRICE > :monthly_budget AND MONTH = :target_month END_EXEC",
        ],
        correctAnswers: [
          "EXEC SQL DECLARE c CURSOR FOR SELECT ITEM FROM GROCERY WHERE PRICE > :monthly_budget AND MONTH = :target_month END_EXEC",
        ],
        explanation: "Variables declared in the host language must begin with ':' inside the embedded SQL query.",
        hinglishExplanation:
          "Embedded SQL (jab SQL ko kisi programming language ke andar likha jaata hai) mein, jo bhi variable HOST LANGUAGE mein declare kiya gaya hai, use SQL statement ke andar refer karte waqt uske pehle COLON (:) lagana zaroori hota hai. Yahan monthly_budget aur target_month dono host language variables hain, isliye dono ke pehle ':' hona chahiye.",
      },
      {
        id: "w3-q10",
        type: "MSQ",
        question:
          "Consider the following instance of the relation:\nConcerts(CName, TheatrID, HallNo, Event, Genres, Showtime, ShowDay)\n\nCName | TheatrID | HallNo | Event | Genres | Showtime | ShowDay\nBob Dylan | HASHTAG | 3 | Recorded | Rock | 12 | Monday\nThe Miliputs | KCC | 4 | Recorded | Folk | 15 | Wednesday\nBitkel asor | EZCC | 1 | Live | Rock | 17 | Wednesday\nPancham | EZCC | 2 | Live | Bollywood | 16 | Thursday\nPancham | HASHTAG | 3 | Recorded | Folk | 13 | Friday\n\nWhich of the following CNames are produced by the Relational Algebra expression given below?\nΠ(CName)( σ(HallNo>2 ∧ Genres='Folk')(Concerts) ) ∩ Π(CName)( σ(Event='Recorded')(Concerts) )",
        options: ["Bob Dylan", "The Miliputs", "Bitkel asor", "Pancham"],
        correctAnswers: ["The Miliputs", "Pancham"],
        explanation:
          "Π(CName)(σ(HallNo>2 ∧ Genres='Folk')(Concerts)) produces The Miliputs, Pancham. Both of those are also Recorded events, so the intersection keeps The Miliputs and Pancham.",
        hinglishExplanation:
          "Pehle part mein hum woh concerts dhoondte hain jinka HallNo 2 se zyada hai AUR Genre 'Folk' hai — yeh The Miliputs aur Pancham dete hain. Doosre part mein hum woh concerts dhoondte hain jo 'Recorded' event hain. Dono results ka INTERSECTION lene par The Miliputs aur Pancham dono Recorded bhi hain, isliye yeh dono final answer mein aate hain.",
      },
    ],
  },
  {
    week: 4,
    title: "Week 4",
    topic: "Assignment 4 — Functional dependencies, normalization, 2NF/3NF/BCNF",
    questions: [
      {
        id: "w4-q1",
        type: "MCQ",
        question:
          "Consider the relation VirtualConf(ConfID, ConfLink, Participants, Admin, Subject) with the following dependencies:\nConfID → Subject\n{Admin, Subject} → Participants\n\nAccording to which of the following rules, {ConfID, ConfLink} → Subject holds?",
        options: ["Augmentation", "Decomposition", "Transitivity", "Pseudo-transitivity"],
        correctAnswers: ["Augmentation"],
        explanation:
          "According to the Augmentation rule, if X determines Y, then XZ determines YZ, which can be decomposed to XZ determines Y.",
        hinglishExplanation:
          "Functional Dependency rules mein AUGMENTATION rule kehta hai: agar X → Y hai, toh XZ → YZ bhi hoga (kisi bhi extra attribute Z ko dono side add kar sakte hain). Yahan ConfID → Subject hai; ConfLink (Z) add karne par {ConfID,ConfLink} → {Subject,ConfLink} milega, jise decompose karke {ConfID,ConfLink} → Subject nikal sakte hain.",
      },
      {
        id: "w4-q2",
        type: "MCQ",
        question:
          "Consider the following instance of Market relation:\nMarket\nMarketName | Product | Stock\nSpendWise | Shampoo | 12\nSpendWise | Spicemix | 6\nSpendWise | Cookies | 6\nShopLuck | Shampoo | 20\nMarkIt | Cakemix | 60\nMarkIt | Chocolate | 12\n\nWhich of the following functional dependencies hold on Market?",
        options: [
          "MarketName → {Product, Stock}",
          "{MarketName, Product} → Stock",
          "{Stock, MarketName} → Product",
          "{Product} → MarketName",
        ],
        correctAnswers: ["{MarketName, Product} → Stock"],
        explanation:
          "Only for {MarketName, Product} → Stock do the attributes on the L.H.S uniquely identify the attribute on the R.H.S in this instance.",
        hinglishExplanation:
          "Functional dependency check karne ke liye humein dekhna hota hai ki L.H.S ki values UNIQUE ho toh R.H.S bhi HAMESHA unique nikle. Yahan {MarketName, Product} combination har row mein UNIQUE hai, aur uske corresponding Stock bhi consistent hai. 'MarketName → Product,Stock' fail hota hai kyunki SpendWise ke multiple products hain.",
      },
      {
        id: "w4-q3",
        type: "MCQ",
        question:
          "Consider the relation Smartphone(model, name, manufacturer, battery) and the functional dependencies are:\nFD1: model → name\nFD2: model → manufacturer, battery\nFD3: model, manufacturer → battery\n\nIdentify the incorrect statement related to the relation smart phone.",
        options: [
          "Smart phone is in First Normal Form",
          "Smart phone is in Second Normal Form",
          "Smart phone is in BCNF",
          "Smart phone is not normalized",
        ],
        correctAnswers: ["Smart phone is not normalized"],
        explanation:
          "The canonical cover is FD1 and FD2 (which covers FD3), and model is the key. So Smartphone is in BCNF, which also means it's in 1NF, 2NF, and 3NF. In FD3, the non-prime attribute is dependent on a super key, with no transitive dependency or composite key issue.",
        hinglishExplanation:
          "Pehle canonical cover nikalna padta hai — FD3 FD1 aur FD2 se hi derive ho jaata hai, isliye redundant hai. Baaki FD1/FD2 mein 'model' hi key hai (single attribute key), isliye partial/transitive dependency ho hi nahi sakti. Isliye relation BCNF mein hai, jo automatically 1NF/2NF/3NF mein bhi hota hai — 'not normalized' wala statement galat hai.",
      },
      {
        id: "w4-q4",
        type: "MCQ",
        question:
          "Consider the relation VirtualConf(ConfID, ConfLink, Subject, Admin, Participants). Which of the following set of Functional Dependencies should be chosen so that VirtualConf can be in 2NF but not in 3NF?",
        options: [
          "ConfID → {ConfLink,Subject}\nConfLink → Participants\nAdmin → Subject",
          "{ConfID,ConfLink} → {Subject,Admin,Participants}\n{Admin,Subject} → {ConfLink,Participants,ConfID}",
          "{ConfID,ConfLink} → {Subject,Admin,Participants}\nAdmin → ConfLink",
          "{ConfID,Admin} → {ConfLink,Subject}\nConfLink → Participants",
        ],
        correctAnswers: ["{ConfID,Admin} → {ConfLink,Subject}\nConfLink → Participants"],
        explanation:
          "For option (a), the candidate key is {ConfID, Admin}; a partial dependency is present, so it's only in 1NF. For option (b), the candidate keys {ConfID,ConfLink} and {Admin,Subject} appear on the LHS of both FDs, keeping it in BCNF. For option (c), there's neither partial nor transitive dependency, so it's in 3NF. For option (d), the candidate key is {ConfID, Admin}, there's no partial dependency, but there IS a transitive dependency — so it's in 2NF but not 3NF.",
        hinglishExplanation:
          "2NF ka matlab hai: koi PARTIAL dependency nahi honi chahiye. 3NF ka matlab hai: koi TRANSITIVE dependency bhi nahi honi chahiye. Option (d) mein candidate key {ConfID,Admin} hai — partial dependency nahi hai, lekin ConfLink → Participants ek transitive dependency create karta hai. Isliye yeh 2NF mein hai lekin 3NF mein nahi.",
      },
      {
        id: "w4-q5",
        type: "MSQ",
        question:
          "Consider the following relation:\nMeasurement(sensor, device, dataform, uprange, lowrange, delay, status)\nwith the following Functional dependency set (F):\nFD1: {sensor, device, status} → {dataform, uprange, lowrange}\nFD2: sensor → {delay, status}\nFD3: {status, delay, dataform} → {sensor, device}\n\nMeasurement has 3 candidate keys. Keys K1, K2, and K3 have 2, 2, and 3 attributes respectively. The database admin issues the following order:\nX needs to be appended to the R.H.S of FDi so that only K3 and (K1 ∩ K2) become the candidate keys of Measurement. Find X and i.",
        options: ["X=dataform, i=1", "X=delay, i=1", "X=dataform, i=2", "X=device, i=2"],
        correctAnswers: ["X=dataform, i=2", "X=device, i=2"],
        explanation:
          "The 3 candidate keys are K1={device, sensor}, K2={dataform, sensor}, K3={dataform, delay, status}, so K1∩K2=sensor. For sensor to become a candidate key, either device or dataform must be appended to the R.H.S of FD2.",
        hinglishExplanation:
          "Yahan 3 candidate keys hain: K1={device,sensor}, K2={dataform,sensor}, K3={dataform,delay,status}. K1 aur K2 ka common part hai 'sensor'. Sirf K3 aur 'sensor' ko candidate key banane ke liye FD2 (sensor → delay,status) ke RHS mein 'device' ya 'dataform' add karna padega, taaki sensor ka closure poori relation cover kar sake.",
      },
      {
        id: "w4-q6",
        type: "MCQ",
        question:
          "Consider the following relation CabService(RegNo, Vehicle, Color, Capacity, Owner) with the following Functional Dependency sets:\nC1 = { FD1: {Vehicle, Color} → Capacity, FD2: RegNo → {Vehicle, Capacity, Owner} }\nC2 = { FD1: Vehicle → {Color, Capacity}, FD2: RegNo → {Vehicle, Owner} }\n\nWhich of the following statements is true?",
        options: [
          "Neither C1 covers C2 nor C2 covers C1",
          "C2 covers C1 but C1 does not cover C2",
          "C1 covers C2 but C2 does not cover C1",
          "Both C1 covers C2 and C2 covers C1",
        ],
        correctAnswers: ["C2 covers C1 but C1 does not cover C2"],
        explanation:
          "Vehicle → {Color, Capacity} from C2 cannot be derived from C1, since (Vehicle)+ doesn't contain {Color, Capacity} under C1. But all FDs of C1 can be derived from C2.",
        hinglishExplanation:
          "Ek FD set doosre ko 'cover' karta hai agar uske saare FDs doosre set se DERIVE ho sakein. C2 ka FD 'Vehicle → {Color,Capacity}' C1 se derive nahi ho sakta. Lekin C1 ke saare FDs C2 se easily derive ho jaate hain. Isliye C2, C1 ko cover karta hai, lekin C1, C2 ko cover nahi karta.",
      },
      {
        id: "w4-q7",
        type: "MCQ",
        question:
          "In the following relation R suppose the following functional dependency holds:\nF = { m→n, np→g, o→p, q→p, n→q }\n\nThe closure of (n)+ is:",
        options: ["(n, m, q, p, g)", "(n, q, p, g)", "(n, o, p, q)", "(n, q, g, o)"],
        correctAnswers: ["(n, q, p, g)"],
        explanation: "(n)+ = (n, q) [since n→q] = (n, q, p) [since q→p] = (n, q, p, g) [since np→g].",
        hinglishExplanation:
          "Attribute closure (n)+ nikalne ke liye hum step by step FDs apply karte hain jab tak koi naya attribute na mile. {n} → 'n→q' se {n,q} → 'q→p' se {n,q,p} → 'np→g' se {n,q,p,g}. Ab koi aur FD apply nahi ho sakti, isliye final closure hai (n,q,p,g).",
      },
      {
        id: "w4-q8",
        type: "MCQ",
        question:
          "Consider the following relation:\nMeasurement(sensor, device, dataform, uprange, lowrange, delay, status)\nwith the following Functional dependency set (F) = {\nFD1: sensor,device,status → dataform, uprange, lowrange\nFD2: sensor → delay,status\nFD3: status,delay,dataform → sensor, device\n}\n\nWhich of the following Functional Dependencies will not be present in the Canonical Cover of F after the application of the Union Rule on the final Functional Dependencies?",
        options: [
          "{sensor, device, status} → {dataform, uprange, lowrange}",
          "sensor → {delay,status}",
          "{status, delay, dataform} → {sensor, device}",
          "{sensor, device} → {dataform, uprange, lowrange}",
        ],
        correctAnswers: ["{sensor, device, status} → {dataform, uprange, lowrange}"],
        explanation:
          "The closure of {sensor, device} still includes status, so status is extraneous on the L.H.S of the first FD. No other attribute can be removed elsewhere, so this exact FD is not present in the canonical cover.",
        hinglishExplanation:
          "Canonical cover banate waqt hum check karte hain ki kisi FD ke L.H.S mein koi EXTRANEOUS (unnecessary) attribute toh nahi hai. Yahan sirf {sensor,device} ka closure nikalne par bhi 'status' automatically mil jaata hai (sensor→status FD2 se), matlab 'status' extraneous hai. Isliye is EXACT FD ka full version canonical cover mein nahi rahega.",
      },
      {
        id: "w4-q9",
        type: "MCQ",
        question:
          "Consider the following relation:\nVirtualConf(ConfID, ConfLink, Day, Admin, Subject, Participants) with the following Functional Dependencies:\nFD1: ConfID → ConfLink\nFD2: Admin → Subject\nFD3: {ConfID, Day} → Participants\nFD4: {ConfLink, Subject} → {Day, Admin}\n\nThe relation is decomposed into the following:\nVirtualConf1(ConfID, ConfLink, Admin, Subject)\nVirtualConf2(ConfID, Admin, Day, Participants)\n\nWhich of the following is true about the decomposition?",
        options: [
          "Both lossless and dependency preserving.",
          "Neither lossless nor dependency preserving.",
          "Lossless but not dependency preserving.",
          "Lossy but dependency preserving.",
        ],
        correctAnswers: ["Lossless but not dependency preserving."],
        explanation:
          "The common attributes {ConfID, Admin} are a key in VirtualConf1, so the decomposition is lossless. FD1 and FD2 derive from VirtualConf1, FD3 from VirtualConf2, but FD4 cannot be derived — violating dependency preservation.",
        hinglishExplanation:
          "LOSSLESS decomposition check karne ke liye dekho ki common attributes (ConfID, Admin) kisi ek decomposed relation mein CANDIDATE KEY hain — VirtualConf1 mein hain, isliye lossless hai. DEPENDENCY PRESERVING check karo ki saare FDs kisi relation se derive ho sakein — FD4 kisi se derive nahi ho pa raha, isliye dependency preserving NAHI hai.",
      },
      {
        id: "w4-q10",
        type: "MSQ",
        question:
          "Consider the relation Person(Pname, Hobby, Language). A Person can have many hobbies and can speak many languages independently. Which dependency exists?",
        options: ["Pname →→ Hobby", "Pname,Hobby →→ Language", "Pname →→ Language", "Hobby,Language →→ Pname"],
        correctAnswers: ["Pname →→ Hobby", "Pname →→ Language"],
        explanation:
          "Since hobbies and languages are independent of each other for a given person, both are multivalued dependencies (MVDs) on Pname alone: Pname →→ Hobby and Pname →→ Language.",
        hinglishExplanation:
          "Multivalued Dependency (MVD, →→) tab hota hai jab ek attribute ke multiple independent values ho sakte hain, doosre multivalued attribute se independent. Ek Person ke multiple Hobbies (independent of Language) aur multiple Languages (independent of Hobby) ho sakte hain. Isliye do separate MVDs: Pname →→ Hobby aur Pname →→ Language.",
      },
    ],
  },
  {
    week: 5,
    title: "Week 5",
    topic: "Assignment 5 — URLs/web services, disks, RAID, availability, ER diagrams",
    questions: [
      {
        id: "w5-q1",
        type: "MCQ",
        question:
          "Consider the URL: https://onlinecourses.nptel.ac.in/e-learning/\n\nIdentify the correct statement(s) about it.",
        options: [
          "The first part 'https' is called the path name.",
          "The second part 'onlinecourses.nptel.ac.in' is called the domain name.",
          "The part 'ac.in' is called the sub-domain name.",
          "The rest of the URL '/e-learning' is called a Uniform Resource Identifier.",
        ],
        correctAnswers: ["The second part 'onlinecourses.nptel.ac.in' is called the domain name."],
        explanation:
          "The first part of a URL indicates the access protocol; the second part gives the unique machine name (domain name); the rest of the URL identifies the document within that machine.",
        hinglishExplanation:
          "Ek URL ke parts hote hain: pehla part (https) PROTOCOL batata hai. Doosra part (onlinecourses.nptel.ac.in) DOMAIN NAME hai — machine ka unique address. Baaki bacha hua part document ki LOCATION batata hai us machine ke andar. Isliye 'domain name' wala statement hi sahi hai.",
      },
      {
        id: "w5-q2",
        type: "MSQ",
        question: "Identify the correct statement(s) from the following options.",
        options: [
          "REST is a type of Web Service.",
          "REST and JSON cannot work together.",
          "XML data format is traditionally associated with Big Web Services.",
          "Data can not be accessed using remote procedure call mechanism on the Web.",
        ],
        correctAnswers: ["REST is a type of Web Service.", "XML data format is traditionally associated with Big Web Services."],
        explanation: "REST is indeed a type of web service, and XML is traditionally associated with Big Web Services.",
        hinglishExplanation:
          "REST ek architecture style hai jo Web Services banane ke liye use hota hai — isliye 'REST is a type of Web Service' sahi hai. XML historically 'Big Web Services' ke saath associate kiya jaata hai data-format ke roop mein. REST actually JSON ke saath bahut achhe se kaam karta hai (yeh statement galat hai), aur RPC bhi Web pe possible hai (yeh bhi galat statement hai).",
      },
      {
        id: "w5-q3",
        type: "MSQ",
        question: "Which of the following statement(s) is (are) incorrect?",
        options: [
          "Disk controller acts as an interface between the computer system and the disk drive hardware.",
          "When a sector is found to be bad, the disk controller remaps the logical sector to a different physical sector.",
          "Mean time to failure (MTTF) is the maximum time, when a disk can run continuously without any failure.",
          "When a huge number of disks are connected by a high-speed network to a number of servers, it is called Network Area Storage.",
        ],
        correctAnswers: [
          "Mean time to failure (MTTF) is the maximum time, when a disk can run continuously without any failure.",
          "When a huge number of disks are connected by a high-speed network to a number of servers, it is called Network Area Storage.",
        ],
        explanation:
          "MTTF is the average (not maximum) time a disk can run without failure. And connecting many disks by high-speed network to servers is called Storage Area Networks, not Network Area Storage. The other two statements are correct.",
        hinglishExplanation:
          "MTTF (Mean Time To Failure) ka matlab AVERAGE time hota hai — 'maximum' nahi. Jab bahut saari disks high-speed network se servers se connect ki jaati hain, use 'Storage Area Network (SAN)' kehte hain, 'Network Area Storage' nahi — naam hi galat hai. Baaki dono statements sahi hain.",
      },
      {
        id: "w5-q4",
        type: "MCQ",
        question:
          "Suppose, there is a 512 gigabyte magnetic disk with 256 surfaces and 1024 tracks per surface. If it has 512 sectors in each track, what will be the size of one sector?",
        options: ["512 bytes", "1 KB", "2 KB", "4 KB"],
        correctAnswers: ["4 KB"],
        explanation:
          "Capacity = surfaces × tracks/surface × sectors/track × bytes/sector. Sector size = (512×2^30) / (256×1024×512) bytes = 2^12 bytes = 4 KB.",
        hinglishExplanation:
          "Total disk capacity = surfaces × tracks × sectors × bytes-per-sector. Sector size nikalne ke liye formula rearrange karo: (512×2^30) ÷ (256×1024×512) bytes = 2^12 bytes = 4096 bytes = 4 KB.",
      },
      {
        id: "w5-q5",
        type: "MCQ",
        question:
          "Consider A Redundant Arrays of Independent Disks system (RAID) of Level 1 uses 8 disks. The storage capacity of each disk is 2 Terabyte. Find the usable storage capacity.",
        options: ["16 TB", "8 TB", "4 TB", "2 TB"],
        correctAnswers: ["8 TB"],
        explanation: "RAID 1 mirrors data. Usable capacity = (8 × 2 TB) ÷ 2 = 8 TB.",
        hinglishExplanation:
          "RAID Level 1 'mirroring' karta hai — har disk ka ek EXACT COPY doosri disk pe hota hai. Iska matlab total 8 disks mein se sirf AADHI capacity USABLE hoti hai. Total = 8×2TB = 16TB, usable = 16TB÷2 = 8TB.",
      },
      {
        id: "w5-q6",
        type: "MCQ",
        question:
          "What will be the availability of the Redundant Arrays of Independent Disks (RAID) system, if the Mean Time Between Failure (MTBF) is 25 days and the Mean Time To Repair (MTTR) the system is 20 hours?",
        options: ["96.77%", "96.02%", "58.14%", "30.25%"],
        correctAnswers: ["96.77%"],
        explanation: "Availability = MTBF / (MTBF + MTTR) = (25×24) / (25×24 + 20) = 600/620 ≈ 96.77%.",
        hinglishExplanation:
          "Availability formula: MTBF ÷ (MTBF + MTTR). MTBF ko ghante mein convert karo: 25×24=600 ghante. Formula: 600÷(600+20) = 600÷620 ≈ 96.77%.",
      },
      {
        id: "w5-q7",
        type: "MSQ",
        question:
          "In a Drawing Competition, participants individually can enroll their names for the competition. There are many groups in the competition depending on the age of the participants. A participant can participate in only one group and a group can consist of multiple participants. Each group has a unique name(GName) and a participant also has a unique id. The result of each group will be maintained separately.\n\nER structure: Group(GName, AgeLimit) --1---Participate---n--> Participant(PID, Name, Age), with Participate carrying attribute Result.\n\nWhich of the following statement(s) are incorrect?",
        options: [
          "Entity Group will not have any primary key.",
          "Participate will be a one-to-many relationship between Group and Participants.",
          "Participate will be a many-to-many relationship between Group and Participant.",
          "GName can be the foreign key of Participate relation between Group and Participant.",
        ],
        correctAnswers: [
          "Entity Group will not have any primary key.",
          "Participate will be a many-to-many relationship between Group and Participant.",
        ],
        explanation:
          "The ER diagram shows a one-to-many relationship between Group and Participant, not many-to-many. GName is the primary key of Group, so it CAN be the foreign key of Participate. So statements (a) and (c) are the incorrect ones.",
        hinglishExplanation:
          "Diagram mein '1' aur 'n' likha hai — EK Group mein MULTIPLE Participants ho sakte hain, lekin EK Participant sirf EK Group mein. Yeh ONE-TO-MANY hai, MANY-TO-MANY nahi. GName primary key hai, aur primary key hamesha kisi related table mein FOREIGN KEY ban sakti hai — isliye 'no primary key' wala statement bhi galat hai.",
      },
      {
        id: "w5-q8",
        type: "MCQ",
        question:
          "Consider a relation DrawingCompetition(paintId, pNo, topic, pName, painter, year, materials)\npaintId → pName, topic\npNo → painter, materials\npaintId, topic → year\n\nIf we perform a schema refinement on DrawingCompetition, which of the following set of relations will be in the refined schema?",
        options: [
          "Painter(pNo, painter, materials)\nDrawingCompetition(paintId, topic, pName, materials)\nDomain(topic, year)",
          "Painter(pNo, painter, materials)\nDrawingCompetition(paintId, topic, pName, year)",
          "Painter(pNo, painter, materials)\nDrawingCompetition(paintId, pName, year)\nDomain(topic, year)",
          "Painter(pNo, painter, materials)\nDrawingCompetition(paintId, pNo, topic, pName, year)",
        ],
        correctAnswers: ["Painter(pNo, painter, materials)\nDrawingCompetition(paintId, pNo, topic, pName, year)"],
        explanation:
          "In options (a), (b), and (c), there are no common attributes between Painter and DrawingCompetition to rejoin them into the original table. Option (d) preserves pNo as the common attribute.",
        hinglishExplanation:
          "Schema refinement mein decomposed relations ko wapas JOIN karke original relation banane ke liye dono relations mein kam se kam EK COMMON attribute hona chahiye. Options (a),(b),(c) mein Painter aur DrawingCompetition ke beech koi common attribute nahi bacha. Sirf option (d) mein 'pNo' common attribute hai.",
      },
      {
        id: "w5-q9",
        type: "MCQ",
        question:
          "An operating system uses the Least Recently Used (LRU) strategy for replacing its buffer. Suppose, the system allocates 3 free main memory buffer blocks for the execution of a query. If the query requires the following disk blocks to access to complete its execution:\n12, 9, 17, 9, 3, 9, 12, 17, 11, 3, 9, 3, 4, 17\n\nWhat will be the image of those 3 buffer blocks after servicing the disk block '11'?",
        options: ["12 9 11", "17 9 11", "11 9 12", "17 11 12"],
        correctAnswers: ["17 11 12"],
        explanation:
          "Tracing LRU replacement through the sequence up to block 11 gives buffer contents 17, 11, 12 (9 was least recently used and gets replaced by 11).",
        hinglishExplanation:
          "LRU (Least Recently Used) mein jab buffer full ho, SABSE PURANE (jo sabse lambe time se use nahi hua) block ko replace karte hain. Sequence trace karne par, jab block '11' aata hai, buffer mein 17,9,12 the aur '9' sabse kam recently use hua tha, toh usse replace kiya. Final: 17, 11, 12.",
      },
      {
        id: "w5-q10",
        type: "MCQ",
        question:
          "Suppose, there is a sequential file for the relation Building with the following description:\n• Assume record size is fixed.\n• Records do not cross block boundaries.\nIf the size of one record is 30 bytes, the size of one disk block is 512 bytes and the block pointer size is 18 bytes long. What is the maximum number of records that can be stored in one block?",
        options: ["14", "16", "17", "18"],
        correctAnswers: ["16"],
        explanation: "Available space = 512 − 18 = 494 bytes. Since records can't cross block boundaries: 494 ÷ 30 = 16 records.",
        hinglishExplanation:
          "Har block mein kuch space POINTER ke liye reserved hota hai. Available space = 512−18 = 494 bytes. 494÷30 = 16.46, aur records BLOCK BOUNDARY cross nahi kar sakte, isliye sirf POORA number lenge — 16 records.",
      },
    ],
  },
  {
    week: 6,
    title: "Week 6",
    topic: "Assignment 6 — Indexing, B-trees/B+-trees, hashing, bitmap indexes",
    questions: [
      {
        id: "w6-q1",
        type: "MCQ",
        question:
          "Consider a relation Smartphone(IMEI, model, manufacturer), contains 1,00,000 smartphone records sorted by IMEI. However, users frequently search for a smartphone by its model. What type of index should be created?",
        options: ["Primary indexing", "Secondary indexing", "Clustering indexing", "Multilevel indexing"],
        correctAnswers: ["Secondary indexing"],
        explanation:
          "The file is physically sorted by IMEI, not by model. Since model is a non-ordering attribute frequently searched on, a secondary index speeds up these searches (pointing to all matching records since multiple IMEIs can share a model).",
        hinglishExplanation:
          "File already IMEI (primary/ordering attribute) ke hisaab se sorted hai. Users 'model' se search karte hain, jo NON-ORDERING attribute hai. Jab bhi hum kisi non-ordering attribute pe fast search chahte hain, hum uspe SECONDARY INDEX banate hain.",
      },
      {
        id: "w6-q2",
        type: "MSQ",
        question: "Identify the correct statement(s) for a B+ Tree and B-Tree.",
        options: [
          "In B+ Tree keys and records are stored in both internal nodes and leaf nodes.",
          "In B-Tree keys are stored in internal nodes and data are stored only in the leaf nodes.",
          "Sequential access is faster in the B+ Tree as the leaf nodes are linked.",
          "Sequential access is slower in the B-Tree as the leaf nodes are not linked.",
        ],
        correctAnswers: [
          "Sequential access is faster in the B+ Tree as the leaf nodes are linked.",
          "Sequential access is slower in the B-Tree as the leaf nodes are not linked.",
        ],
        explanation:
          "In a B-Tree, keys and records are stored in both internal and leaf nodes. In a B+ Tree, internal nodes store only keys while all records are in the leaf nodes, which are linked — making sequential access faster than in a B-Tree, whose leaf nodes are not typically linked.",
        hinglishExplanation:
          "B-Tree mein DATA internal nodes AUR leaf nodes dono mein store hota hai. B+ Tree mein sirf KEYS internal nodes mein, SAARE records sirf LEAF nodes mein. B+ Tree ke leaf nodes ek doosre se LINKED hote hain, isliye SEQUENTIAL access FAST hota hai. B-Tree mein aisi linking nahi hoti, isliye SLOWER hota hai.",
      },
      {
        id: "w6-q3",
        type: "MCQ",
        question:
          "A database file contains 12,000 records stored in sorted order. Each disk block can store 50 records. If a sparse index has two entries per data block, how many index entries are needed?",
        options: ["50", "240", "480", "12000"],
        correctAnswers: ["480"],
        explanation:
          "Number of data blocks = 12000 / 50 = 240. A sparse index with 2 entries per data block needs 2 × 240 = 480 index entries.",
        hinglishExplanation:
          "Total DATA BLOCKS = 12000÷50 = 240 blocks. Sparse index mein har data block ke liye SIRF DO entries hoti hain. Total index entries = 240×2 = 480.",
      },
      {
        id: "w6-q4",
        type: "MCQ",
        question:
          "Insert the following keys into an empty 2-3-4 tree:\n11, 24, 31, 38, 45, 51, 52, 59, 66, 73\nHow many 3-nodes (nodes with 2 keys) will be in the final tree?",
        options: ["3", "2", "1", "0"],
        correctAnswers: ["2"],
        explanation:
          "The final 2-3-4 tree has root [38], children [24] and [51 59], and leaves [11], [31], [45], [52], [66 73]. There are two 3-nodes (nodes with 2 keys): [51 59] and [66 73].",
        hinglishExplanation:
          "2-3-4 tree mein har node mein 1, 2, ya 3 keys ho sakti hain. Keys insert karne par final tree banta hai jisme sirf do nodes hain jinme 2 KEYS hain (3-nodes): [51,59] aur [66,73]. Isliye answer 2 hai.",
      },
      {
        id: "w6-q5",
        type: "MCQ",
        question:
          "Suppose that one block in a disk can store either 6 records or 15 key pointers. If a database contains 1200 records, how many total number of blocks do we need to store the data file and the index file?",
        options: ["280", "260", "200", "90"],
        correctAnswers: ["280"],
        explanation:
          "Blocks for the data file = 1200/6 = 200. Blocks for a dense record index = 1200/15 = 80. Total = 200 + 80 = 280 blocks.",
        hinglishExplanation:
          "Data file ke liye blocks = 1200÷6 = 200. Dense index file ke liye blocks = 1200÷15 = 80. Total blocks = 200+80 = 280.",
      },
      {
        id: "w6-q6",
        type: "MCQ",
        question:
          "Consider the following 2-3-4 tree in which each data item is a character:\n\n              [J]\n           /       \\\n        [C]        [N  T]\n       /   \\      /   |    \\\n     [A]  [E G H] [K L] [P] [U Y]\n\nHow many comparisons will be required to find 'M' in the above tree?",
        options: ["2", "3", "4", "5"],
        correctAnswers: ["4"],
        explanation:
          "Search for 'M': Start at [J]. M > J → go right to [N T]. M < N → go left to [K L]. M > K → compare with L; M > L → not found (leaf, no further child). That's 4 comparisons total.",
        hinglishExplanation:
          "2-3-4 tree mein search karte waqt root se compare karte hue niche jaate hain. 'M' ke liye: root [J] se M>J (right jao [N,T]), M<N (left jao [K,L]), M>K, fir M>L (leaf hai, aage koi child nahi) — 'M' nahi mila. Total comparisons: J,N,K,L = 4.",
      },
      {
        id: "w6-q7",
        type: "MCQ",
        question:
          "A database file is indexed with hashing with bucket size 100 and the hash function H(key) = (key ÷ 11) % 100. Compute the location where the key k = 21375 will be placed.",
        options: ["19", "43", "75", "94"],
        correctAnswers: ["43"],
        explanation: "H(21375) = (21375 ÷ 11) % 100 = 1943 % 100 = 43.",
        hinglishExplanation:
          "Hash function: H(key)=(key÷11)%100. k=21375: 21375÷11=1943 (integer division), fir 1943%100=43 (modulo se remainder).",
      },
      {
        id: "w6-q8",
        type: "MCQ",
        question:
          "Consider there is a relational table Product(pID, pName, type, price). There is a bitmap index file on type of the Product. The size of the index file is 1 KB. If there are 512 rows in the Product table, how many different types of Products are there?",
        options: ["4", "8", "16", "32"],
        correctAnswers: ["16"],
        explanation:
          "A bitmap index on N rows with m distinct values has N×m bits. Size = 1 KB = 1024×8 bits. Number of types = (1024×8)/512 = 16.",
        hinglishExplanation:
          "Bitmap index mein N rows aur m distinct values ke liye total bits = N×m. Index size=1KB=8192 bits, N=512. m = 8192÷512 = 16 different types.",
      },
      {
        id: "w6-q9",
        type: "MCQ",
        question:
          "The order of an internal node in a B+ tree index is the maximum number of children it can have. Suppose that a child pointer takes 8 bytes, the search key field value takes 10 bytes, and the order of the internal node is 57. Identify the minimum block size.",
        options: ["512 bytes", "1024 bytes", "2048 bytes", "4096 bytes"],
        correctAnswers: ["1024 bytes"],
        explanation:
          "Block Size = (m × pointer size) + ((m-1) × key size) = (57×8) + (56×10) = 456 + 560 = 1016 bytes ≈ 1024 bytes (rounded up to a power of 2).",
        hinglishExplanation:
          "B+ tree internal node mein 'm' pointers aur 'm-1' keys hoti hain. Block Size = (m×pointer size)+((m-1)×key size) = (57×8)+(56×10) = 456+560 = 1016 bytes. Block sizes hamesha 2 ki POWER mein hoti hain, agla valid size 1024 bytes hai.",
      },
      {
        id: "w6-q10",
        type: "MSQ",
        question:
          "Consider the following Customer relation:\nCustID | CustomerName | city | Age\n245649325 | Anurav | Kolkata | 25\n408473932 | Rangeet | Mumbai | 18\n33344575 | Shreya | Kolkata | 47\n122987554 | Abir | New Delhi | 42\n759447011 | Swagata | Mumbai | 53\n524564932 | Satyait | Pune | 20\n458473921 | Ramesh | Hyderabad | 37\n320044575 | Avinash | Kolkata | 30\n202987554 | Rajan | Pune | 24\n775947011 | Avinash | New Delhi | 55\n\nConsider the bitmap index for Age, with A1, A2, A3 and A4 representing the bitmaps for Age intervals.\nA1: 1 1 0 1 0 1 1 1 1 0\nA2: 0 0 1 0 1 0 0 0 0 1\nA3: 1 0 1 1 0 0 1 1 0 0\nA4: 0 0 1 1 1 0 1 1 0 1\n\nChoose the incorrect option(s) based on the above.",
        options: [
          "A1 is a bitmap index for Age below 40.",
          "A2 is a bitmap index for Age 40 to below 60.",
          "A3 is a bitmap index for Age 25 to below 50.",
          "A4 is a bitmap index for Age 30 and above.",
        ],
        correctAnswers: ["A1 is a bitmap index for Age below 40.", "A2 is a bitmap index for Age 40 to below 60."],
        explanation:
          "Mapping the actual ages to true/false against each claimed range shows A1 does not correctly represent 'Age below 40' and A2 does not correctly represent 'Age 40 to below 60'. The other two options are correct.",
        hinglishExplanation:
          "Har customer ki actual age ko bitmap ke 1s/0s se match karke check karte hain ki claimed range sahi hai ya nahi. Actual ages dekhne par pata chalta hai A1 'Age below 40' ko sahi represent nahi karta, aur A2 'Age 40-60' ko bhi sahi represent nahi karta — dono galat hain.",
      },
    ],
  },
  {
    week: 7,
    title: "Week 7",
    topic: "Assignment 7 — Schedules, serializability, locking, deadlocks, recoverability",
    questions: [
      {
        id: "w7-q1",
        type: "MCQ",
        question:
          "Consider the following schedule S involving five transactions T1, T2, T3, T4 and T5, in this time order:\nT2: W(X)\nT1: R(X)\nT3: R(X)\nT5: W(Z)\nT4: R(Z)\nT3: W(X)\nT1: R(Z)\n\nR(X) denotes read operation on data item X by transaction Ti. W(X) denotes write operation on data item X by transaction Ti.\n\nChoose the correct option for the above transaction schedule.",
        options: [
          "The schedule is both view and conflict serializable schedule.",
          "The schedule is neither conflict serializable nor view serializable schedule.",
          "The schedule is only view serializable schedule.",
          "The schedule is only conflict serializable schedule.",
        ],
        correctAnswers: ["The schedule is both view and conflict serializable schedule."],
        explanation:
          "The precedence graph of the transactions has no cycle, so the schedule is conflict serializable. All conflict serializable schedules are also view serializable.",
        hinglishExplanation:
          "Serializability check karne ke liye PRECEDENCE GRAPH banate hain — agar Ti kisi shared item pe Tj se pehle conflict-operation karta hai, toh Ti→Tj edge banti hai. Agar graph mein CYCLE nahi hai, schedule CONFLICT SERIALIZABLE hai, aur har conflict serializable schedule VIEW SERIALIZABLE bhi hota hai. Yahan graph mein cycle nahi hai, isliye dono hai.",
      },
      {
        id: "w7-q2",
        type: "MCQ",
        question:
          "Consider the following schedule S involving five transactions T1, T2, T3, T4, and T5, in this time order:\nT1: R(X)\nT2: W(X)\nT4: R(Z)\nT3: W(X)\nT1: W(Z)\nT5: R(Z)\n\nR(X) denotes the read operation on data item X by transaction Ti. W(X) denotes the write operation on data item X by transaction Ti.\n\nIdentify the possible number of conflict serializable schedules corresponding to the above schedule.",
        options: ["2", "3", "4", "5"],
        correctAnswers: ["3"],
        explanation:
          "The precedence graph gives edges T4→T1, T1→T2, T1→T3, T1→T5, T2→T3, which is acyclic (conflict serializable). The possible topological orderings are: T4→T1→T2→T3→T5, T4→T1→T2→T5→T3, T4→T1→T5→T2→T3 — 3 total.",
        hinglishExplanation:
          "Precedence graph banane ke baad, uske SAARE POSSIBLE TOPOLOGICAL ORDERINGS count karne hain — har ordering ek alag equivalent serial schedule hai. Edges: T4→T1, T1→T2, T1→T3, T1→T5, T2→T3 — is graph ke exactly 3 valid topological orderings possible hain.",
      },
      {
        id: "w7-q3",
        type: "MCQ",
        question:
          "Suppose in a database, there are four transactions T1, T2, T3 and T4. Transaction T1 is waiting for transactions T3 and T4, transaction T2 is waiting for transaction T3, and transaction T3 is waiting for transaction T4 to release a data item.\n\nThe correct wait-for graph therefore has edges: T1→T3, T1→T4, T2→T3, T3→T4.\n\n(Flagged: in the source PDF the four answer choices were drawn as wait-for-graph diagrams, not text. The edge set below for option (c) is preserved correctly from the worked explanation; options (a), (b) and (d) are plausible edge-direction variants standing in for the un-transcribable diagrams, not exact copies of the original incorrect options.)\n\nWhich edge set below correctly represents the wait-for graph for the scenario above?",
        options: [
          "a) T1→T3, T4→T1, T2→T3, T4→T3",
          "b) T3→T1, T1→T4, T3→T2, T3→T4",
          "c) T1→T3, T1→T4, T2→T3, T3→T4",
          "d) T1→T3, T1→T4, T3→T2, T4→T3",
        ],
        correctAnswers: ["c) T1→T3, T1→T4, T2→T3, T3→T4"],
        explanation:
          "When Ti requests a data item held by Tj, the edge Ti → Tj is inserted in the wait-for graph. So T1→T3, T1→T4 (T1 waits for both T3 and T4), T2→T3 (T2 waits for T3), and T3→T4 (T3 waits for T4) correctly represent the given waiting relationships.",
        hinglishExplanation:
          "Wait-for graph mein, jab Ti kisi data item ka wait kar raha ho jo Tj ke paas hai, hum edge Ti→Tj banate hain. Yahan T1, T3 aur T4 dono ka wait kar raha hai, T2, T3 ka wait kar raha hai, aur T3, T4 ka wait kar raha hai — in sabko sahi direction mein draw karne se sahi graph banta hai.",
      },
      {
        id: "w7-q4",
        type: "MCQ",
        question:
          "The following table shows the values of the database items before and after the execution of a schedule involving two transactions T1 and T2.\nData Item | Initial Value | Final Value\nA | 1000 | 500\nB | 500 | 900\nD | 300 | 400\n\nThe transactions are defined as follows:\nT1: A := A − 400, B := B + 400\nT2: A := A − 100, D := D + 100\n\nWhich of the following serial schedules is equivalent to the above execution?",
        options: [
          "Only T1 followed by T2",
          "Only T2 followed by T1",
          "Both T1 followed by T2 and T2 followed by T1",
          "Neither T1 followed by T2 nor T2 followed by T1",
        ],
        correctAnswers: ["Both T1 followed by T2 and T2 followed by T1"],
        explanation:
          "Both orderings (T1→T2 and T2→T1) independently produce the same final state: A=500, B=900, D=400, since T1 and T2's effects on A are additive regardless of order, and they touch different other variables (B vs D).",
        hinglishExplanation:
          "T1 sirf A aur B ko touch karta hai, T2 sirf A aur D ko touch karta hai — sirf A common hai. Dono transactions A mein sirf SUBTRACT kar rahe hain (additive operation), toh order matter nahi karta — 1000-400-100=500 chahe kisi bhi order mein ho. Isliye dono orderings same result denge.",
      },
      {
        id: "w7-q5",
        type: "MCQ",
        question:
          "Consider the following lock compatibility matrix, where S denotes a shared lock and X denotes an exclusive lock.\n       S      X\nS   True   False\nX  False  False\n\nSuppose transaction T1 has already acquired a lock on data item A. Which one of the following lock requests by another transaction T2 will be granted immediately?",
        options: [
          "T1 holds an S lock on A, and T2 requests an S lock on A.",
          "T1 holds an S lock on A, and T2 requests an X lock on A.",
          "T1 holds an X lock on A, and T2 requests an S lock on A.",
          "T1 holds an X lock on A, and T2 requests an X lock on A.",
        ],
        correctAnswers: ["T1 holds an S lock on A, and T2 requests an S lock on A."],
        explanation:
          "Two transactions can simultaneously hold shared (S) locks on the same item. An exclusive (X) lock is incompatible with any other lock. Only option (a) is granted immediately.",
        hinglishExplanation:
          "Lock Compatibility Matrix batata hai kaun se locks EK SAATH grant ho sakte hain. Do transactions EK SAATH SHARED lock hold kar sakte hain. EXCLUSIVE lock kisi bhi doosre lock ke saath INCOMPATIBLE hota hai. Isliye sirf 'S aur S' wala case immediately grant hoga.",
      },
      {
        id: "w7-q6",
        type: "MCQ",
        question:
          "A database system uses the Wait-Die deadlock prevention scheme. Transaction T1 has timestamp 8, and transaction T2 has timestamp 15. Transaction T2 has already acquired an exclusive lock on data item X. Transaction T1 now requests an exclusive lock on X.\n\nWhich of the following statements is correct?",
        options: [
          "Transaction T1 waits until transaction T2 releases the lock.",
          "Transaction T1 is rolled back.",
          "Transaction T2 is rolled back.",
          "Both transactions T1 and T2 are rolled back.",
        ],
        correctAnswers: ["Transaction T1 waits until transaction T2 releases the lock."],
        explanation:
          "In Wait-Die, an older transaction (smaller timestamp) is allowed to wait for a younger one holding the lock. Since T1 (8) is older than T2 (15), T1 waits.",
        hinglishExplanation:
          "Wait-Die scheme mein CHOTA timestamp matlab PURANA transaction. Agar OLDER, YOUNGER ka lock maange, OLDER WAIT karta hai. Agar YOUNGER, OLDER ka lock maange, YOUNGER ROLLBACK hota hai. T1(8) OLDER hai T2(15) se, aur T1 T2 ka lock maang raha hai — isliye T1 WAIT karega.",
      },
      {
        id: "w7-q7",
        type: "MCQ",
        question:
          "Consider the following two transactions where lock-X(A) denotes an Exclusive-mode lock on A, and lock-S(A) denotes a Shared-mode lock on A:\n\nT1: lock-S(A), read(A), lock-X(B), read(B), write(B), unlock(A), commit, unlock(B)\nT2: lock-X(A), read(A), write(A), lock-S(B), read(B), commit, unlock(A), unlock(B)\n\nWhich of the following statement(s) is/are true?",
        options: [
          "T1 follows only the rigorous two-phase locking protocol, whereas T2 follows the strict two-phase locking protocol.",
          "T1 follows the strict two-phase locking protocol, whereas T2 follows the rigorous two-phase locking protocol.",
          "Both T1 and T2 follow the rigorous two-phase locking protocol.",
          "Neither T1 nor T2 follows the two-phase locking protocol.",
        ],
        correctAnswers: [
          "T1 follows the strict two-phase locking protocol, whereas T2 follows the rigorous two-phase locking protocol.",
        ],
        explanation:
          "T1 releases its shared lock on A before commit but holds its exclusive lock on B until commit — satisfying basic 2PL and Strict 2PL, but not Rigorous 2PL. T2 holds both its locks until after commit, satisfying Rigorous 2PL (and therefore Strict 2PL and 2PL too).",
        hinglishExplanation:
          "Basic 2PL: lock release ke baad naya lock nahi le sakte. Strict 2PL: sirf EXCLUSIVE locks commit tak hold karne padte hain. Rigorous 2PL: DONO locks commit tak hold karne padte hain. T1 shared lock commit se PEHLE release karta hai (Strict, not Rigorous). T2 dono locks commit ke baad release karta hai (Rigorous).",
      },
      {
        id: "w7-q8",
        type: "MCQ",
        question:
          "Consider two schedules S1 and S2, where S denotes a shared mode lock and X denotes an exclusive mode lock.\n\nS1:\nT1: lock-S(A), read(A), lock-S(B), read(B), unlock(A), unlock(B)\nT2: lock-S(A), read(A), lock-X(B), read(B), write(B), unlock(A), unlock(B)\n\nS2:\nT1: lock-X(A), read(A), write(A), unlock(A), lock-S(B), read(B), unlock(B)\nT2: lock-S(A), read(A), lock-S(B), read(B), unlock(A), unlock(B)\n\nIdentify the correct statement about whether the schedules are deadlock free. Note: if a schedule suffers from deadlock, some operations of the transactions in that schedule may not execute.",
        options: [
          "Both S1 and S2 will suffer from deadlock.",
          "S1 will suffer from deadlock, S2 will not suffer from deadlock.",
          "S1 will not suffer from deadlock, S2 will suffer from deadlock.",
          "Neither S1 nor S2 will suffer from deadlock.",
        ],
        correctAnswers: ["Neither S1 nor S2 will suffer from deadlock."],
        explanation:
          "In S1, T2's shared lock request on A is compatible with T1's shared lock, and after T1 unlocks B, T2's exclusive lock request on B is granted — no deadlock. In S2, after T1 releases its exclusive lock on A, T2's shared lock request on A is granted, and shared locks on B are mutually compatible — no deadlock in either.",
        hinglishExplanation:
          "Deadlock tab hota hai jab transactions EK DOOSRE KA LOCK circularly WAIT kar rahe hon. Dono schedules mein jab bhi koi lock request hota hai, woh ya toh compatible hota hai ya pehle wala release ho chuka hota hai — isliye circular waiting kahin nahi banti, matlab KOI DEADLOCK NAHI.",
      },
      {
        id: "w7-q9",
        type: "MCQ",
        question:
          "Consider the following two schedules S1 and S2 involving transactions T1 and T2.\n\nS1:\nT1: W(X), COMMIT\nT2: R(X), COMMIT   (T2's operations occur after T1 commits)\n\nS2:\nT1: W(X) ... COMMIT (commits last)\nT2: R(X), COMMIT   (T2 reads X before T1 commits, but commits after T1 commits)\n\nHere, R(X) and W(X) denote the read and write operations, respectively, performed on data item X.\n\nWhich of the following statement(s) is/are false?",
        options: [
          "Both S1 and S2 are Recoverable Schedules.",
          "S1 is a Strict Schedule.",
          "S2 is a Recoverable Schedule, but not a Cascadeless Schedule.",
          "S1 is a Recoverable Schedule, whereas S2 is a Cascadeless Schedule.",
        ],
        correctAnswers: ["S1 is a Recoverable Schedule, whereas S2 is a Cascadeless Schedule."],
        explanation:
          "In S1, T2 reads X only after T1 commits, so S1 is Recoverable, Cascadeless, and Strict. In S2, T2 reads X before T1 commits but commits only after T1 commits, so S2 is Recoverable but NOT Cascadeless. This makes statement (d) false, since S2 is not actually cascadeless.",
        hinglishExplanation:
          "RECOVERABLE: Tj, Ti ka data padhe toh Ti ka commit, Tj ke commit se PEHLE hona chahiye. CASCADELESS: Ti ka commit, Tj ke READ se bhi PEHLE hona chahiye. S1 mein T2 commit ke BAAD hi read karta hai — Recoverable+Cascadeless+Strict. S2 mein T2 commit se PEHLE read karta hai (commit baad mein) — Recoverable hai but Cascadeless NAHI.",
      },
      {
        id: "w7-q10",
        type: "MCQ",
        question:
          "Consider the following schedule S (reconstructed from the worked explanation below, since the source PDF rendered this as a table image), involving transactions T1, T2, T3, in this time order:\nT3: R(X)\nT2: W(X)\nT1: R(X)\nT2: W(X)\nT1: W(X)\nT1: W(Y)\n\nR(X) denotes read operation on data item X by Transaction Ti. W(X) denotes write operation on data item X by Transaction Ti.\n\nIdentify the possible number of view serializable schedules of the above schedule S.",
        options: ["1", "2", "3", "4"],
        correctAnswers: ["1"],
        explanation:
          "The final update on both X and Y is made by T1, so T1 must execute after T2 and T3: (T2, T3) → T1. The initial read of X is by T3, and T2 is the first transaction to update X after that read, giving T3 → T2. The write-read sequence (T2 writes X, then T1 reads X) gives T2 → T1. The only valid ordering is T3 → T2 → T1, so there is exactly 1 possible view serializable schedule.",
        hinglishExplanation:
          "View serializability ke rules: (1) FINAL value likhne wala transaction sabse AAKHIR mein — T1 (X aur Y dono). (2) Initial read wale ke baad pehla write — T3→T2. (3) Write-read sequence — T2→T1. In sab ko combine karne se sirf EK valid ordering: T3→T2→T1.",
      },
    ],
  },
  {
    week: 8,
    title: "Week 8",
    topic: "Assignment 8 — Recovery (immediate modification, checkpoints, logical undo), query cost & optimization",
    questions: [
      {
        id: "w8-q1",
        type: "MSQ",
        question:
          "Assume an immediate database modification scheme. Consider the following log records for transactions T0, T1, T2, T3 and T4:\nsteps | Details of log\n1 | <T0,start>\n2 | <T0,A,400,600>\n3 | <T1,start>\n4 | <T1,B,600,900>\n5 | <T2,start>\n6 | <T0,commit>\n7 | <T2,C,900,1500>\n8 | <checkpoint{T1, T2}>\n9 | <T3,start>\n10 | <T2,commit>\n11 | <T3,D,800,900>\n12 | <T3,commit>\n13 | <T4,start>\n14 | <T4,E,500,1000>\n\nIf there is a crash just after step 14 and the recovery of the system is successfully completed, identify the correct action for the above scenario.",
        options: [
          "After recovery completion, value of B will be 600.",
          "After recovery completion, value of C will be 1500.",
          "After recovery completion, value of D will be 800.",
          "After recovery completion, value of E will be 1000.",
        ],
        correctAnswers: [
          "After recovery completion, value of B will be 600.",
          "After recovery completion, value of C will be 1500.",
        ],
        explanation:
          "In the immediate database modification scheme, during recovery after a crash, a transaction needs to be redone if and only if both <Ti,start> and <Ti,commit> are present in the log. Otherwise undo is required. Any transaction committed before the last checkpoint is ignored (updates already output to disk). Here the redo list is {T2, T3} and the undo list is {T1, T4}; T0 needs no action since it committed before the checkpoint. Undoing T1 restores B to its before-value (600), and redoing T2 sets C to its after-value (1500) — so options (a) and (b) are correct.",
        hinglishExplanation:
          "Immediate database modification scheme mein, recovery ke time yeh dekha jaata hai ki kis transaction ke log mein <start> AUR <commit> dono hain — agar dono hain toh REDO karna hai, agar sirf <start> hai (commit nahi hua) toh UNDO karna hai. Jo transaction LAST CHECKPOINT se PEHLE commit ho chuka hai, use IGNORE kar dete hain (uska data already disk pe safely likha ja chuka hai). Yahan T0 checkpoint se pehle commit hua tha isliye ignore. T1 aur T4 crash tak commit nahi hue the, isliye UNDO honge (matlab B wapas apni PURANI value 600 pe chali jaayegi). T2 aur T3 checkpoint ke baad commit ho chuke the, isliye REDO honge (matlab C apni NAYI value 1500 pe rahegi). Isliye options (a) aur (b) sahi hain.",
      },
      {
        id: "w8-q2",
        type: "MCQ",
        question:
          "Assume an immediate database modification scheme. Consider the following log records for transactions T5, T6, T7, T8 and T9:\nsteps | Details of log\n1 | <T5,start>\n2 | <T5,A,150,250>\n3 | <T6,start>\n4 | <T6,B,250,350>\n5 | <T5,commit>\n6 | <checkpoint{T6}>\n7 | <T6,commit>\n8 | <T7,start>\n9 | <T7,C,350,550>\n10 | <T8,start>\n11 | <T8,D,700,900>\n12 | <T8,commit>\n13 | <T9,start>\n14 | <T9,E,900,1100>\n\nIf there is a crash just after step 14 and the recovery of the system is successfully completed, identify the correct recovery action for the above scenario.",
        options: [
          "No Action: T5; Redo: T7, T8; Undo: T6, T9",
          "No Action: T6; Redo: T7, T8; Undo: T5, T9",
          "No Action: T5; Redo: T7, T9; Undo: T6, T8",
          "No Action: T5; Redo: T6, T8; Undo: T7, T9",
        ],
        correctAnswers: ["No Action: T5; Redo: T6, T8; Undo: T7, T9"],
        explanation:
          "T5 committed before the checkpoint, so no action is required for it. T6 was active at the checkpoint but committed after it, so it must be redone. T7 started after the checkpoint but never committed before the crash, so it must be undone. T8 started after the checkpoint and committed before the crash, so it must be redone. T9 started after the checkpoint but never committed, so it must be undone. Final lists: No Action: T5; Redo: T6, T8; Undo: T7, T9.",
        hinglishExplanation:
          "Yahan bhi wahi logic hai: jo checkpoint se PEHLE commit ho chuka (T5), use koi action nahi chahiye. Jo checkpoint ke time active tha lekin BAAD mein commit hua (T6, T8), unhe REDO karna hai. Jo start toh hua lekin crash tak commit NAHI hua (T7, T9), unhe UNDO karna hai. Isliye final answer: No Action T5; Redo T6,T8; Undo T7,T9.",
      },
      {
        id: "w8-q3",
        type: "MCQ",
        question:
          "Identify the cost estimation of a query evaluation plan, if 8000 blocks are required to be transferred from the disk and the required number of disk seeks are 40.\n• Time to transfer one block: tT = 5 milliseconds.\n• Time for one seek: tS = 0.5 seconds.",
        options: ["40 Seconds", "50 Seconds", "60 Seconds", "70 Seconds"],
        correctAnswers: ["60 Seconds"],
        explanation:
          "Cost for b block transfers plus S seeks = (b × tT + S × tS) seconds = (8000 × 5 × 10⁻³) + (40 × 0.5) seconds = (40 + 20) seconds = 60 seconds.",
        hinglishExplanation:
          "Query cost estimate karne ka formula hai: Total cost = (block transfers × time per block) + (number of seeks × time per seek). Yahan values daalo: (8000 blocks × 5 milliseconds) + (40 seeks × 0.5 seconds) = (8000×0.005) + (40×0.5) = 40 seconds + 20 seconds = 60 seconds.",
      },
      {
        id: "w8-q4",
        type: "MCQ",
        question:
          "Let us consider the following statistics for two relations Vehicle and Service_Record:\n• Number of records of Vehicle: n(Vehicle) = 5000.\n• Number of blocks of Vehicle: b(Vehicle) = 50.\n• Number of records of Service_Record: n(Service_Record) = 1000.\n• Number of blocks of Service_Record: b(Service_Record) = 10.\n\nConsider a natural join of Vehicle and Service_Record relations (Vehicle ⋈ Service_Record). Identify the required number of block transfers in the worst case (enough memory only to hold one block of each relation) using Nested-loop join and assuming Vehicle as the outer relation.",
        options: [
          "5000 block transfers",
          "50010 block transfer",
          "50050 block transfers",
          "60060 block transfers",
        ],
        correctAnswers: ["50050 block transfers"],
        explanation:
          "For block nested-loop join with only one block of memory per relation, the outer relation is read block-by-block, and for each outer block the entire inner relation is scanned. Number of block transfers = n(outer) × b(inner) + b(outer) = 5000×10 + 50 = 50050, with Vehicle as the outer relation.",
        hinglishExplanation:
          "Nested-loop join mein (jab memory sirf ek-ek block hold kar sakti hai), formula hota hai: Block transfers = (outer relation ke records × inner relation ke blocks) + outer relation ke blocks. Vehicle ko OUTER lene par: 5000 (Vehicle records) × 10 (Service_Record blocks) + 50 (Vehicle blocks) = 50000+50 = 50050 block transfers.",
      },
      {
        id: "w8-q5",
        type: "MCQ",
        question:
          "Consider the following state of transactions on a timeline that has two checkpoints (Checkpoint 1, Checkpoint 2) followed by a System Failure. (Flagged: this was originally a timeline diagram in the source PDF; the bar positions below are reconstructed from the worked explanation, since a diagram isn't transcribable as text.)\n\n- T1: starts and commits, both entirely before Checkpoint 1.\n- T2: starts before Checkpoint 1 and commits right at/around Checkpoint 1.\n- T3: starts after Checkpoint 1 and commits before Checkpoint 2.\n- T4: starts before Checkpoint 2 (spanning across it) and commits after Checkpoint 2, before the System Failure.\n- T5: starts before Checkpoint 2 (spanning across it) and is still running (uncommitted) at the System Failure.\n- T6: starts before Checkpoint 2 (spanning across it) and is still running (uncommitted) at the System Failure.\n\nConsider the following statements:\n1. T1, T2 and T3 can be ignored.\n2. T2 and T4 can be ignored.\n3. T5, and T6 need to be redone.\n4. T5 and T6 need to be undone.\n5. Only T4 needs to be redone.\n\nIdentify the correct group of statements from the options below.",
        options: ["1), 2), 3), 5)", "1), 3), 4), 5)", "1), 4), 5)", "1), 2), 5)"],
        correctAnswers: ["1), 4), 5)"],
        explanation:
          "Any transaction committed before the last checkpoint (Checkpoint 2) should be ignored — so T1, T2 and T3 can be ignored, since their updates are already safely on disk. Any transaction committed since the last checkpoint needs to be redone — T4 fits this, so it must be redone. Any transaction still running at the time of failure needs to be undone and restarted — T5 and T6 fit this. So the correct group is statements 1), 4), and 5).",
        hinglishExplanation:
          "Recovery ka rule simple hai: jo transaction LAST CHECKPOINT (yaha Checkpoint 2) se PEHLE commit ho chuka hai, use IGNORE karo (T1, T2, T3 — inka data already safely disk pe hai). Jo checkpoint ke BAAD commit hua hai, use REDO karo (T4). Jo crash ke waqt tak bhi RUNNING tha (commit hi nahi hua), use UNDO karo (T5, T6). Isliye sahi group hai: statements 1), 4), aur 5).",
      },
      {
        id: "w8-q6",
        type: "MCQ",
        question:
          "Consider the following relational schema:\nVehicle(vehicle_id, vehicle_name, model, owner_id)\nService_Record(service_id, vehicle_id, service_date, service_cost)\nOwner(owner_id, owner_name, address, phone)\n\nTwo query trees are given below, both ultimately computing Π(vehicle_name, owner_name) over a join of all three relations. (Flagged: the source PDF drew these as query-tree diagrams; the indented text below reconstructs the same tree structure.)\n\nFigure 1 — selection is applied AFTER both joins are done:\nΠ(vehicle_name, owner_name)\n  of  σ(service_cost > 5000)\n        of  [ (Vehicle ⋈ Service_Record) ⋈ Owner ]\n\nFigure 2 — selection is pushed down and applied directly on Service_Record, BEFORE the join:\nΠ(vehicle_name, owner_name)\n  of  [ (Vehicle ⋈ σ(service_cost > 5000)(Service_Record)) ⋈ Owner ]\n\nIdentify the correct statement for the above two query trees.",
        options: [
          "Two query trees are equivalent and the query tree of Figure 1 will lead to more efficient query processing.",
          "Two query trees are equivalent and the query tree of Figure 2 will lead to more efficient query processing.",
          "Two query trees are equivalent as identical operations (irrespective of their positions) are used in both trees.",
          "Two query trees are not equivalent as selection or projection operations cannot be carried out before or after the natural join operation.",
        ],
        correctAnswers: [
          "Two query trees are equivalent and the query tree of Figure 2 will lead to more efficient query processing.",
        ],
        explanation:
          "The two trees are equivalent, but Figure 2 is more efficient because performing the selection as early as possible (directly on Service_Record, before the join) reduces the size of the relation participating in the natural join — fewer tuples need to be processed during the join.",
        hinglishExplanation:
          "Query optimization ka ek basic rule hai: SELECTION operation ko JITNI JALDI ho sake apply karo (push it down), taaki join se PEHLE hi relation ka size chota ho jaaye. Figure 1 mein selection SABSE AAKHIR mein (dono joins ke baad) apply ho raha hai — matlab bade table pe selection lag raha hai, slow hai. Figure 2 mein selection Service_Record pe pehle hi apply ho jaata hai, phir chote result ko join kiya jaata hai — fast hai. Dono trees SAME result denge (equivalent hain), lekin Figure 2 zyada EFFICIENT hai kyunki join mein kam tuples process karne padte hain.",
      },
      {
        id: "w8-q7",
        type: "MSQ",
        question:
          "Consider the following relational schema:\nVehicle(vehicle_id, vehicle_name, model, owner_id)\nService_Record(service_id, vehicle_id, service_date, service_cost)\nOwner(owner_id, owner_name, address, phone)\n\nFour relational algebra queries are given below:\nQ1: σ(model='SUV')( σ(service_cost>5000)( Vehicle ⋈ Service_Record ⋈ Owner ) )\nQ2: σ(model='SUV' ∧ service_cost>5000)( Vehicle ⋈ Service_Record ⋈ Owner )\nQ3: Π(vehicle_name, owner_name)( Vehicle ⋈ Service_Record ⋈ Owner )\nQ4: Π(vehicle_name, owner_name)( Vehicle × Service_Record × Owner )\n\nIdentify the correct options from the options given below.",
        options: [
          "Q1 is equivalent to Q2.",
          "Q1 is not equivalent to Q2.",
          "Q3 is equivalent to Q4.",
          "Q3 is not equivalent to Q4.",
        ],
        correctAnswers: ["Q1 is equivalent to Q2.", "Q3 is not equivalent to Q4."],
        explanation:
          "Q1 and Q2 give the same result because two consecutive selections can always be combined into one using AND: σC1(σC2(R)) = σ(C1∧C2)(R). So Q1 is equivalent to Q2. Q3 and Q4 do NOT give the same result, because the natural join of the three relations (which matches on shared key attributes) is not the same as their unrestricted Cartesian product (which pairs every row with every row, including non-matching combinations).",
        hinglishExplanation:
          "Do CONSECUTIVE selections (σC1(σC2(R))) ko hamesha EK selection mein combine kiya ja sakta hai AND (∧) use karke — σ(C1∧C2)(R). Isliye Q1 aur Q2 same result denge, matlab equivalent hain. Lekin NATURAL JOIN (⋈) aur CARTESIAN PRODUCT (×) ALAG hote hain — natural join sirf MATCHING rows ko jodta hai (common key ke through), jabki cartesian product HAR row ko HAR row ke saath jod deta hai (bina match check kiye). Isliye Q3 aur Q4 equivalent NAHI hain.",
      },
      {
        id: "w8-q8",
        type: "MCQ",
        question:
          "Consider the log record of Transaction T1 with one operation instance O1, used in a recovery system with early lock release, B+ tree based concurrency control.\nStep | Operation\n1 | <T1,start>\n2 | <T1,X,900,800>\n3 | <T1,O1,operation-begin>\n4 | <T1,Y,400,700>\n5 | <T1,Z,500,900>\n6 | <T1,O1,operation-end,(Y,-300),(Z,-400)>\n7 | crash or abort here\n\nChoose the correct set of log entries for the recovery of transactions.",
        options: [
          "<T1,Z,500,900>\n<T1,Y,400,700>\n<T1,O1,operation-abort>\n<T1,X,900>\n<T1,abort>",
          "<T1,Z,500,900>\n<T1,Y,400,700>\n<T1,O1,operation-abort>\n<T1,X,800>\n<T1,abort>",
          "<T1,Z,900,500>\n<T1,Y,700,400>\n<T1,O1,operation-abort>\n<T1,X,800>\n<T1,abort>",
          "<T1,Z,900,500>\n<T1,Y,700,400>\n<T1,O1,operation-abort>\n<T1,X,900>\n<T1,abort>",
        ],
        correctAnswers: ["<T1,Z,900,500>\n<T1,Y,700,400>\n<T1,O1,operation-abort>\n<T1,X,900>\n<T1,abort>"],
        explanation:
          "Recovery scans the log backward. At step 6, the operation-end log for O1 with (Y,-300) and (Z,-400) is found, meaning O1 needs a LOGICAL undo — reverse the +300 and +400 changes it made on Y and Z respectively, rather than a plain physical undo. This produces new compensation log records <T1,Z,900,500>, <T1,Y,700,400>, and <T1,O1,operation-abort> (in that order, undoing Z then Y since we scan backward from step 5 to step 3). Then step 2's physical update on X is undone normally with <T1,X,900> (X's before-value). Finally <T1,abort> is logged for step 1. This matches option (d).",
        hinglishExplanation:
          "Recovery LOG ko hamesha PEECHE se (backward) scan karte hain. Step 6 mein O1 ka 'operation-end' log milta hai jisme likha hai ki Y mein -300 aur Z mein -400 ka change hua tha. Chunki yeh ek LOGICAL operation tha, humein iska REVERSE karna hoga — pehle Z (900→500 wapas), fir Y (700→400 wapas), fir O1 ko 'operation-abort' mark karo. Uske baad step 2 ka normal physical undo hoga X ke liye (X ki purani value 900 wapas). Aakhir mein poori transaction ko 'abort' mark kar dete hain — yeh sab sahi order mein option (d) mein diya gaya hai.",
      },
      {
        id: "w8-q9",
        type: "MCQ",
        question:
          "Consider the following relational schema:\nArtifact(AID, Artifact_Name, Gallery_ID, Year_Acquired)\nGallery(Gallery_ID, Gallery_Name)\n\nConsider the following relational algebra expression:\nΠ(Artifact_Name)( σ(Gallery_Name='Ancient' ∧ Year_Acquired<1900)( Artifact ⋈(Artifact.Gallery_ID=Gallery.Gallery_ID) Gallery ) )\n\nIdentify the most optimized relational algebra expression equivalent to the above relational algebra expression.",
        options: [
          "Π(Artifact_Name)( σ(Year_Acquired<1900)(Artifact) ⋈(Artifact.Gallery_ID=Gallery.Gallery_ID) σ(Gallery_Name='Ancient')(Gallery) )",
          "Π(Artifact_Name)( σ(Gallery_Name='Ancient')( σ(Year_Acquired<1900)( Artifact ⋈(Artifact.Gallery_ID=Gallery.Gallery_ID) Gallery ) ) )",
          "Π(Artifact_Name, Gallery_ID)( σ(Year_Acquired<1900 ∧ Gallery_Name='Ancient')( Artifact ⋈(Artifact.Gallery_ID=Gallery.Gallery_ID) Gallery ) )",
          "Π(Artifact_Name)( Artifact ⋈(Artifact.Gallery_ID=Gallery.Gallery_ID) σ(Year_Acquired<1900 ∧ Gallery_Name='Ancient')(Gallery) )",
        ],
        correctAnswers: [
          "Π(Artifact_Name)( σ(Year_Acquired<1900)(Artifact) ⋈(Artifact.Gallery_ID=Gallery.Gallery_ID) σ(Gallery_Name='Ancient')(Gallery) )",
        ],
        explanation:
          "The optimization pushes each part of the selection condition down to the relation it actually belongs to: Year_Acquired<1900 refers to an Artifact attribute, so it's pushed onto Artifact; Gallery_Name='Ancient' refers to a Gallery attribute, so it's pushed onto Gallery. This shrinks both relations before the (more expensive) join runs. Option (b) only pushes the Year_Acquired condition down and leaves Gallery_Name applied after the join, so it's less optimized. Option (d) is invalid — it applies Year_Acquired<1900 to Gallery, but Year_Acquired isn't even an attribute of Gallery.",
        hinglishExplanation:
          "Query optimization mein selection condition ke HAR PART ko us relation pe PUSH DOWN karna chahiye jisse woh actually SAMBANDHIT (related) hai. Yahan 'Year_Acquired<1900' Artifact table ka attribute hai, isliye ise Artifact pe hi apply karna chahiye — Gallery pe nahi (kyunki Gallery mein Year_Acquired hai hi nahi). Aur 'Gallery_Name=Ancient' Gallery table ka attribute hai, isliye ise Gallery pe apply karo. Dono conditions ko unke SAHI relation pe pehle hi apply karke, dono tables CHOTE ho jaate hain JOIN se pehle — isse join fast ho jaata hai.",
      },
      {
        id: "w8-q10",
        type: "MCQ",
        question:
          "Consider the following Relational Algebra expression:\n(R1 ⋈θ R2) − (R1 ⋈θ R3),\nwhere R1, R2, and R3 are relational algebra expressions and θ is the join condition.\n\nIdentify the correct equivalent Relational Algebra expression.",
        options: [
          "R1 ∩ (R2 ⋈θ R3)",
          "(R1 ⋈θ R2) − R3",
          "R1 ⋈θ (R2 − R3)",
          "(R1 ⋈θ R2) ∩ (R1 ⋈θ R3)",
        ],
        correctAnswers: ["R1 ⋈θ (R2 − R3)"],
        explanation:
          "By the distributive property of the θ-join over set difference: R1 ⋈θ (R2 − R3) = (R1 ⋈θ R2) − (R1 ⋈θ R3). So the join-then-subtract form on the left simplifies to subtracting first, then joining once.",
        hinglishExplanation:
          "Yeh ek IMPORTANT algebraic identity hai: JOIN operation, SET DIFFERENCE (−) ke saath DISTRIBUTE hota hai — matlab R1 ⋈ (R2−R3) = (R1⋈R2) − (R1⋈R3). Iska practical fayda yeh hai ki hum PEHLE chota set-difference (R2−R3) nikaal sakte hain, fir sirf EK BAAR join kar sakte hain — jo do baar join karke phir subtract karne se ZYADA EFFICIENT hota hai.",
      },
    ],
  },
];

export default rawWeeks;
