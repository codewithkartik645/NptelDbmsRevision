// Hinglish (Roman-script Hindi mixed with English technical terms) concept
// explanations, keyed by question id from data/questions.js. Shown alongside
// the English explanation after the student checks their answer — the goal
// is to explain (a) what the question is actually asking in plain Hinglish,
// and (b) the underlying logic/concept so the idea sticks, not just the
// answer key.

const hinglishExplanations = {
  "w1-q1":
    "Question mein pucha ja raha hai ki database ka kaunsa 'level' batata hai ki kaunsa data store hai (uske types/structure), na ki storage ki physical detail. Concept: DBMS mein 3 levels hote hain — Physical (sabse niche, disk pe kaise store hota hai), Logical (beech mein, kya data hai aur unke relationships — yehi woh level hai jahan schema define hota hai), aur View (sabse upar, user ko kya dikhta hai). Yaha 'types of data' ki baat ho rahi hai, isliye yeh Logical level hai.",
  "w1-q2":
    "Yaha diye gaye table ko dekhkar batana hai ki konsa column (ya columns ka combination) har row ko uniquely identify karta hai. Logic: sirf student_id lo toh ek student ke multiple rows hain (duplicate), sirf course_id lo toh wahi problem. Lekin (student_id, course_id) ka pair har row mein alag hai — koi do rows ka combination match nahi karta. Isliye yehi Primary Key ban sakta hai.",
  "w1-q3":
    "Question yeh clear kar raha hai ki 'schema' aur 'instance' mein kya fark hai. Schema matlab structure/blueprint (jaise Employee(empID, empName) — sirf column names, values nahi). Instance matlab actual data/values jo us structure follow karte hain, jaise (5012, Ananya) ek real record hai. Isliye (5012, Ananya) schema ka 'instance' hai, schema khud nahi.",
  "w1-q4":
    "Superkey woh set hai jo row ko uniquely identify kar sake, chahe usme extra unnecessary attributes bhi ho. Candidate key woh superkey hai jisme koi extra attribute na ho — matlab 'minimal' superkey. {ISBN} akela hi unique identify kar sakta hai, isliye candidate key hai. {Price, Category} bhi minimal hai (dono chahiye, ek hataoge toh unique nahi rahega), isliye woh bhi candidate key hai.",
  "w1-q5":
    "Yaha select (σ) pehle dono relations pe apply ho raha hai — Article mein Citations>50 wale rows, aur ArticleTag mein Tag='AI' wale rows. Fir dono ko join (⋈) karte hain, matlab sirf wahi AID milenge jo dono conditions satisfy karte hain — yeh 'AND' wala logic hai, 'OR' nahi. Isliye answer hai: jo Citations>50 bhi hai aur Tag='AI' bhi.",
  "w1-q6":
    "DDL (Data Definition Language) database ka structure/design change karta hai — jaise CREATE, ALTER, DROP. DML (Data Manipulation Language) actual data ke saath kaam karta hai — jaise INSERT, UPDATE, DELETE. S1 mein INSERT hai (naya data daal rahe hain) toh yeh DML hai. S2 mein ALTER TABLE hai (structure badal rahe hain) toh yeh DDL hai.",
  "w1-q7":
    "Foreign key ka rule hai: jo value bhi is column mein aaye, woh doosre table (yaha Department) mein already exist karni chahiye — yeh 'referential integrity' kehlata hai. (a) mein D105 Department mein hai hi nahi — invalid. (b) mein Primary Key A001 do baar repeat hua — invalid. (c) mein Primary Key NULL hai — invalid. (d) mein sab kuch valid hai.",
  "w1-q8":
    "Output mein dekho kaun se rows shamil hue: Texas(70000), California(80000), Ontario(50000), Florida(60000) sab 50000 ya usse zyada hain. Quebec(45000) aur Bavaria(30000) exclude hain kyunki 50000 se kam hain. Isliye condition hai Population >= 50000.",
  "w1-q9":
    "Dono tables mein common (same) rows dhundhne hain — yeh Intersection (∩) ka kaam hai. Texas aur Ontario dono relations mein same values ke saath hain, isliye woh intersection mein aayenge. Difference (−) hota toh sirf ek table ke exclusive rows aate, Union (∪) hota toh dono ke saare unique rows aate.",
  "w1-q10":
    "Yaha do steps honi chahiye: pehle filter karo (Population >= 50000 wale rows chuno — yeh selection σ hai), fir sirf RegionName aur Country columns dikhao (yeh projection Π hai). Order important hai — pehle filter, phir project — warna Quebec aur Bavaria bhi output mein aa jayenge jo nahi chahiye.",

  "w2-q1":
    "SQL mein existing rows ki value change karne ke liye UPDATE statement use hota hai, syntax: UPDATE table SET column=new_value WHERE condition. 'MODIFY' jaisa keyword SQL mein valid nahi hai. Isliye sahi query UPDATE...SET...WHERE ItemCount>2 hai.",
  "w2-q2":
    "Data dekhkar pata karo kaunsa column unique hai. Amit do baar hai (alag DeptName ke saath), Riya bhi do baar — matlab akela EmpName unique nahi. DeptName bhi repeat ho raha hai. Lekin (EmpName, DeptName) ka pair kabhi repeat nahi hota. Isliye yeh combination Primary Key banega.",
  "w2-q3":
    "Pehle dono tables ko BookID se JOIN karo taaki har sale ka Category pata chale. Fir Category ke hisaab se group karke Quantity ka total (SUM) nikalo. Fiction ke rows: 5+2+1=8. Science ka row: 7.",
  "w2-q4":
    "VIEW banane ka sahi syntax hai: CREATE VIEW viewname AS SELECT columns FROM table WHERE condition. Sirf 'AS' likhna ya 'ON...SELECT' likhna galat syntax hai. Poora aur sahi order hi correct answer hai.",
  "w2-q5":
    "'B%' matlab naam 'B' se start hona chahiye. '%e' matlab naam 'e' se end hona chahiye. Dono conditions AND se judi hain, matlab dono sach honi chahiye. Sirf Bangalore dono conditions satisfy karta hai (B se start, e se end).",
  "w2-q6":
    "NATURAL JOIN automatically un columns pe join karta hai jinka naam dono tables mein same ho (yaha ProductID). Yeh common column output mein sirf ek baar aata hai. EQUI JOIN bhi equality pe join karta hai lekin dono columns alag-alag rakhta hai. Output mein ProductID sirf ek baar hai, isliye NATURAL JOIN hai.",
  "w2-q7":
    "Output mein wahi rows hain jinki Salary>=60000 HAI YA jo Sales department ke hain (ya dono) — yeh 'OR' logic hai, kam se kam ek condition true honi chahiye. AND hota toh sirf dono conditions saath satisfy karne wale rows aate.",
  "w2-q8":
    "AVG(Salary) average nikalta hai. WHERE clause pehle filter karta hai ki sirf HR department consider ho, phir uski average salary nikalti hai.",
  "w2-q9":
    "'> ALL (subquery)' ka matlab hai value subquery ke HAR result se bada hona chahiye — matlab sabse bade HR salary se bhi zyada. '> ANY' ka matlab sirf kisi ek se bada hona kaafi hai (weaker). Yaha 'sabse zyada' chahiye isliye ALL sahi hai.",
  "w2-q10":
    "Index banane ka sahi syntax hai: CREATE INDEX index_name ON table_name(column_name). Yeh searches ko fast banata hai jab hum baar baar ek column pe filter karte hain.",

  "w3-q1":
    "Pehle division (÷) operation un schools ko dhundhta hai jinke paas 'Blue' color uniform hai — division tab use hota hai jab humein woh entities chahiye jo saari di gayi values ke saath associated ho — yaha 2 schools milte hain. Fir 'White' color wale school ko union se add karte hain — 1 aur. Total = 2+1 = 3.",
  "w3-q2":
    "Jab do entities (Artisan, Handicraft) ka many-to-many relationship ho, toh relation table (Creates) mein dono ki primary keys honi chahiye. Aur jab ek attribute (Color) multivalued ho, toh usko alag table (Handicraft_color) mein rakhna padta hai, warna table normalized nahi rahega.",
  "w3-q3":
    "Yeh ER-to-relational mapping ka concept hai jab entity (Contact) ke subtypes ho (Personal, Professional). Do tareeke hote hain: (1) Har subtype sirf apni key + apna extra attribute rakhe (count=2), ya (2) Har subtype parent ke saare attributes bhi copy kare (count=3). Dono tareekon mein count kabhi sirf '1' nahi hota — isliye 'n[Personal]=1' aur 'n[Professional]=1' galat hain.",
  "w3-q4":
    "Weak entity (Occupant) ka primary key hamesha uske identifying strong entity (Room) ki key ke saath milta hai — isliye Room_Occ ka key {RNo, OID} hoga. Diagram ke hisaab se Room ka participation Room_Occ mein 'partial' hai, matlab har Room ke saath Occupant hona zaroori nahi.",
  "w3-q5":
    "Tuple calculus mein hum ek variable (t) define karte hain jo condition satisfy kare. Condition hai: Singer ka SID match ho AND Experience 20 se zyada ho. Dono conditions AND (∧) se judi honi chahiye, OR se nahi, kyunki humein specifically wahi Singer chahiye jiska apna Experience>20 ho.",
  "w3-q6":
    "Specialization/ISA hierarchy mein neeche wala subtype (DOGS) apne upar ke saare ancestors (CARNIVORES aur ANIMALS) ke attributes inherit karta hai — jaise child apne parent-grandparent dono se properties leta hai.",
  "w3-q7":
    "Expression ka matlab: 'a' woh values chuno jinke liye koi 'b' exist kare jaha (a,b) relation r mein ho AUR b=15 ho. Pehle condition apply karo (σ B=15), fir sirf column A ko project karo (Π A). Isliye Π(A)(σ(B=15)(r)) sahi hai.",
  "w3-q8":
    "Trigger 'AFTER DELETE ON Presentation' hai, matlab jab Presentation se ek Presenter delete hoga, tabhi yeh chalega. Andar ka code check karta hai ki Schedule mein us deleted Presenter ke alawa koi aur Topic bacha hai ya nahi, aur agar nahi bacha toh Schedule se bhi delete kar deta hai.",
  "w3-q9":
    "Embedded SQL mein jab host language (jaise C) ki variables SQL query ke andar use hoti hain, unke naam se pehle colon (:) lagana zaroori hota hai. Bina colon ke SQL usse column/table samjh leta hai, variable nahi.",
  "w3-q10":
    "Pehle un concerts ko dhundo jinka HallNo>2 AUR Genres='Folk' hai — milte hain The Miliputs aur Pancham. Fir un concerts ko dhundo jo 'Recorded' event hain. Dono lists ka intersection (∩) nikalna hai — The Miliputs aur Pancham dono Recorded bhi hain, isliye yehi final answer hai.",

  "w4-q1":
    "Armstrong's Axioms mein Augmentation rule kehta hai: agar X→Y hai, toh XZ→YZ bhi hoga. Yaha ConfID→Subject diya hai, toh dono taraf ConfLink add karne se {ConfID,ConfLink}→{Subject,ConfLink} banega, jisse {ConfID,ConfLink}→Subject nikal sakte hain.",
  "w4-q2":
    "FD check karne ke liye dekho: agar do rows mein LHS same hai, toh RHS bhi same hona chahiye tabhi FD hold karegi. {MarketName, Product} ka combination har row mein unique hai aur uska Stock bhi consistently determined hai — isliye yeh FD sahi hai.",
  "w4-q3":
    "Canonical cover nikalo — FD3 (model,manufacturer→battery) FD1,FD2 se hi derive ho jaati hai. 'model' hi candidate key hai. Ek hi candidate key ho aur har FD ka LHS superkey ho, toh relation BCNF mein hota hai — jo automatically 1NF,2NF,3NF bhi satisfy karta hai. Isliye 'not normalized' wala statement hi galat/incorrect hai.",
  "w4-q4":
    "2NF ka matlab: koi partial dependency na ho. 3NF ka matlab: koi transitive dependency bhi na ho. Option (d) mein candidate key {ConfID,Admin} hai, partial dependency nahi hai (2NF satisfy), lekin ConfLink→Participants transitive dependency create karta hai — isliye 2NF hai par 3NF nahi.",
  "w4-q5":
    "Teen candidate keys diye hain jinme se do (K1, K2) ka intersection sirf 'sensor' hai. FD2 (sensor→{delay,status}) ke RHS mein 'device' ya 'dataform' add karne se sensor akele se dono candidate keys (K1,K2) ko derive kar payega, jisse sensor khud candidate key ban jayega.",
  "w4-q6":
    "Ek set doosre ko 'cover' karta hai agar uske saare FDs doosre set se derive ho sakein. C2 ka FD 'Vehicle→{Color,Capacity}' C1 se derive nahi ho sakta. Lekin C1 ke dono FDs C2 se derive ho jaate hain. Isliye C2, C1 ko cover karta hai, C1, C2 ko nahi.",
  "w4-q7":
    "Attribute closure (n)+ nikalne ke liye step by step FDs apply karo: n→q (q add), phir q→p (p add), phir np→g (n aur p dono hain toh g add). Final closure: {n,q,p,g}.",
  "w4-q8":
    "Canonical cover banate waqt check karo ki kisi FD ke LHS mein koi 'extra' (extraneous) attribute toh nahi hai. {sensor,device} ka closure khud hi 'status' include kar leta hai, matlab 'status' FD1 ke LHS se hataya ja sakta hai bina result change kiye — isliye original FD1 canonical cover mein nahi rahegi.",
  "w4-q9":
    "Lossless decomposition check: dono decomposed tables ka common attribute ({ConfID,Admin}) kisi ek table mein candidate key hona chahiye — yeh satisfy hota hai. Dependency-preserving check: kya saari original FDs decomposed tables se derive ho sakti hain — FD4 kisi bhi table se derive nahi hoti, isliye dependency-preserving nahi hai.",
  "w4-q10":
    "Jab entity (Person) ke paas do independent multivalued properties ho (Hobby, Language jo ek doosre se related nahi hain), toh alag-alag Multivalued Dependencies (MVD) banti hain: Pname→→Hobby aur Pname→→Language, kyunki har hobby har language ke saath combine ho sakta hai bina kisi restriction ke.",

  "w5-q1":
    "URL ke parts: pehla part (https) protocol batata hai, doosra part (onlinecourses.nptel.ac.in) 'domain name' hai (kaunsi machine/website), baaki part (/e-learning) us machine ke andar konsa document/path hai. Isliye 'domain name' wala statement sahi hai.",
  "w5-q2":
    "REST ek architecture style hai Web Services banane ke liye — isliye 'REST is a type of Web Service' sahi hai. XML traditional 'Big Web Services' (SOAP based) ke saath commonly use hota tha — isliye woh bhi sahi hai. REST-JSON toh saath chalte hain (galat statement), aur RPC se bhi data access ho sakta hai (yeh bhi galat).",
  "w5-q3":
    "MTTF ka matlab AVERAGE time hai jab tak disk bina failure ke chal sakti hai — 'maximum' nahi, isliye galat statement. Jab bahut saari disks high-speed network se servers ke saath connect hoti hain, use 'Storage Area Network (SAN)' kehte hain, 'Network Area Storage' nahi — isliye woh bhi galat hai.",
  "w5-q4":
    "Total disk capacity ko total blocks (surfaces × tracks × sectors) se divide karo taaki ek sector ka size mile. Calculation se 2^12 bytes = 4096 bytes = 4KB milta hai.",
  "w5-q5":
    "RAID 1 mein 'mirroring' hoti hai — data do baar store hota hai safety ke liye, isliye usable capacity total ka aadha hoti hai. 8×2TB=16TB total, mirroring ki wajah se usable = 16/2 = 8TB.",
  "w5-q6":
    "Availability ka formula: MTBF/(MTBF+MTTR). MTBF ko hours mein convert karo (25×24=600 ghante), fir 600/(600+20) = 600/620 ≈ 96.77%.",
  "w5-q7":
    "Diagram mein Group aur Participant ke beech '1' aur 'n' hai matlab one-to-many relationship hai (ek Group ke multiple Participants, lekin ek Participant sirf ek Group mein) — many-to-many nahi. GName (Group ki primary key) Participate relation mein foreign key ban sakta hai. Isliye 'no primary key' aur 'many-to-many' galat statements hain.",
  "w5-q8":
    "Jab hum badi table ko chote tables mein todte hain, dhyan rakhna hota hai ki common attribute bache jisse original table wapas mil sake (lossless decomposition). Sirf option (d) mein Painter aur DrawingCompetition dono ke paas common attribute 'pNo' bacha hai.",
  "w5-q9":
    "LRU algorithm mein jab naya block chahiye aur buffer full ho, toh sabse purane (lambe time se use na hue) block ko hata kar naya daala jaata hai. Sequence trace karke dekho block '11' aane tak buffer mein 17,11,12 bacha reh jaata hai.",
  "w5-q10":
    "Pehle available space nikalo: block size (512) − pointer size (18) = 494 bytes. Fir 494 ko record size (30) se divide karo: 494/30 = 16.46, round down karke 16 records (records block boundary cross nahi kar sakte).",

  "w6-q1":
    "File already IMEI ke hisaab se sorted/organized hai, lekin users model se search karna chahte hain — jo ordering attribute nahi hai. Jab search kisi non-ordering attribute pe frequently ho, toh 'Secondary Index' banaya jaata hai taaki search fast ho.",
  "w6-q2":
    "B-Tree mein data internal nodes aur leaf nodes dono mein store ho sakta hai. B+ Tree mein sirf keys internal nodes mein hoti hain, saara data sirf leaf nodes mein hota hai, aur leaf nodes ek doosre se linked hote hain — isse sequential/range searches B+ Tree mein fast hoti hain.",
  "w6-q3":
    "Pehle total data blocks nikalo: 12000/50 = 240 blocks. Sparse index mein har block ke liye 2 entries hoti hain, toh total = 240×2 = 480.",
  "w6-q4":
    "2-3-4 tree mein insert karte waqt jab node full (3 keys) ho jaata hai, woh split hoke parent ko ek key bhej deta hai. Given keys insert karke final tree banane pe [51 59] aur [66 73] yeh do '3-nodes' (2 keys wale nodes) milte hain.",
  "w6-q5":
    "Data file ke liye blocks: 1200/6 = 200. Dense index ke liye blocks: 1200/15 = 80. Total = 200+80 = 280.",
  "w6-q6":
    "Tree mein search karte waqt root se start karo aur har node pe comparisons count karo jab tak value mile ya leaf pe dead-end ho. 'M' dhundte waqt total 4 comparisons lagte hain (M tree mein hai hi nahi, search leaf pe khatam ho jaata hai).",
  "w6-q7":
    "Diya gaya hash function seedha apply karo: H(21375) = (21375÷11) % 100. Pehle 21375÷11 = 1943, fir 1943 % 100 = 43.",
  "w6-q8":
    "Bitmap index ka total size = (rows) × (distinct values) bits mein. Size=1KB=1024×8 bits, rows=512. Distinct values = (1024×8)/512 = 16.",
  "w6-q9":
    "Internal node ka block size formula: (pointers × pointer size) + (keys × key size). Order 57 matlab 57 pointers, 56 keys. (57×8)+(56×10)=1016 bytes, round karke standard block size 1024 bytes.",
  "w6-q10":
    "Har bitmap ko actual data ke Age column se match karke check karo ki claimed range sahi hai ya nahi. Jaha pattern claimed range se match nahi karta, wahi statement 'incorrect' hai — yaha A1 ('below 40') aur A2 ('40-60') match nahi karte.",

  "w7-q1":
    "Precedence graph banao: jab ek transaction doosre ke baad same data pe operation kare (conflict), unke beech edge draw karo. Agar graph mein cycle na ho, schedule 'conflict serializable' hai — aur har conflict serializable schedule automatically 'view serializable' bhi hoti hai.",
  "w7-q2":
    "Precedence graph banane ke baad, uske saare possible 'topological orderings' count karo — har ordering ek valid serial schedule represent karta hai. Yaha graph ke structure ki wajah se exactly 3 valid orderings ban paati hain.",
  "w7-q3":
    "Wait-for graph ka simple rule: agar Ti, Tj ke lock ka wait kar raha hai, toh edge Ti→Tj banao. Diye gaye waiting relationships ko edges mein convert karo — T1 wait kare T3,T4 ka; T2 wait kare T3 ka; T3 wait kare T4 ka.",
  "w7-q4":
    "Dono transactions alag data items pe kaam kar rahe hain (sirf 'A' common hai jispe dono minus kar rahe hain) — chahe kisi bhi order mein chalayein, final result same aayega kyunki operations independent aur additive hain.",
  "w7-q5":
    "Lock compatibility ka matlab: do Shared(S) locks ek saath ho sakte hain, lekin Exclusive(X) kisi bhi doosre lock ke saath compatible nahi hai. Isliye sirf jab dono Shared lock maang rahe ho, request turant grant hogi.",
  "w7-q6":
    "Wait-Die scheme mein rule: agar 'purana' (chota timestamp) transaction 'naye' ka wait kar raha ho, use wait karne diya jaata hai. Ulta ho toh naya rollback ho jaata hai. T1(8, purana) T2(15, naya) ka wait kar raha hai — toh T1 ko wait karne diya jayega.",
  "w7-q7":
    "Strict 2PL mein sirf Exclusive(X) locks commit tak hold hoti hain. Rigorous 2PL mein DONO (Shared+Exclusive) commit tak hold hoti hain. T1 apna Shared lock commit se pehle release karta hai (Strict 2PL), T2 sab kuch commit ke baad release karta hai (Rigorous 2PL).",
  "w7-q8":
    "Dono schedules ko step-by-step trace karo aur dekho ki koi circular waiting (deadlock) bante hai ya nahi. Dono S1 aur S2 mein saari locks bina circular waiting ke properly grant ho jaati hain, isliye deadlock nahi hota.",
  "w7-q9":
    "Recoverable schedule: T1 ka commit T2 ke commit se pehle hona chahiye agar T2, T1 ka likha data padhe. Cascadeless: T1 ka commit T2 ke 'read' se bhi pehle hona chahiye. S1 mein T2 commit ke baad read karta hai (Recoverable+Cascadeless+Strict). S2 mein T2 commit se pehle read karta hai (Recoverable hai, Cascadeless nahi).",
  "w7-q10":
    "View serializability ke teen rules: (1) 'final write' karne wala transaction sabse aakhri mein aana chahiye, (2) 'initial read' ke baad jo pehli baar update kare wahi transaction next aana chahiye, (3) jo likhta hai woh baad mein padhne wale se pehle aana chahiye. Teeno rules milakar sirf ek order (T3→T2→T1) banta hai.",

  "w8-q1": "Yeh placeholder question hai — Assignment 8 upload hone ke baad iska Hinglish explanation bhi update ho jayega.",
  "w8-q2": "Yeh placeholder question hai — Assignment 8 upload hone ke baad iska Hinglish explanation bhi update ho jayega.",
};

export default hinglishExplanations;
