// 1. เรียกใช้งาน Express ซึ่งเป็นเครื่องมือสร้าง Web Server
const express = require("express");
const app = express();

// 2. สร้าง Route หรือเส้นทาง เมื่อมีคนพิมพ์ URL เข้ามาที่หน้าแรก (/)
app.get("/", (request, response) => {
    // สิ่งที่ Server จะตอบกลับไป (Response)
    response.send(`
        <!doctype html>
        <html lang="th">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>My First Server - สวยๆ</title>
            <style>
                :root{
                    --pink-50: #fff0f6;
                    --pink-100: #ffd6e8;
                    --pink-200: #ffb3d9;
                    --accent: #ff7ab6; /* สีหลัก */
                    --muted: #5b214b;
                    --card-bg: rgba(255,255,255,0.65);
                }
                /* Reset เบาๆ */
                *{box-sizing: border-box; margin:0; padding:0}
                html,body{height:100%}
                body{
                    font-family: 'Segoe UI', Roboto, 'Noto Sans Thai', sans-serif;
                    background: radial-gradient(1200px 600px at 10% 10%, #fff0f7 0%, rgba(255,224,240,0.6) 10%, transparent 35%),
                                linear-gradient(135deg, var(--pink-50) 0%, var(--pink-100) 35%, var(--pink-200) 100%);
                    color:var(--muted);
                    -webkit-font-smoothing:antialiased;
                    -moz-osx-font-smoothing:grayscale;
                    min-height:100vh;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    padding:40px 20px;
                    overflow:hidden;
                }

                /* ลูกเล่น: วงกลมลอย */
                .floaters{
                    position:fixed; inset:0; pointer-events:none;
                }
                .bubble{
                    position:absolute;
                    border-radius:50%;
                    opacity:0.18;
                    filter: blur(6px);
                    animation: floaty 12s linear infinite;
                }
                .bubble.b1{width:260px; height:260px; left:-60px; top:10%; background:linear-gradient(120deg,#ffd6e8,#ffe7f3); animation-duration:18s}
                .bubble.b2{width:160px; height:160px; right:-40px; top:20%; background:linear-gradient(120deg,#ffb3d9,#ffd6e8); animation-duration:14s}
                .bubble.b3{width:120px; height:120px; left:10%; bottom:-30px; background:linear-gradient(120deg,#ffdfe9,#fff0f7); animation-duration:16s}
                .bubble.b4{width:220px; height:220px; right:5%; bottom:5%; background:linear-gradient(120deg,#ffe0f0,#ffcee6); animation-duration:20s}

                @keyframes floaty{
                    0%{transform: translateY(0) translateX(0) scale(1)}
                    50%{transform: translateY(-30px) translateX(8px) scale(1.03)}
                    100%{transform: translateY(0) translateX(0) scale(1)}
                }

                /* Card */
                .card{
                    width:100%; max-width:680px;
                    background:var(--card-bg);
                    border-radius:20px;
                    padding:28px;
                    box-shadow: 0 10px 30px rgba(171, 68, 140, 0.12);
                    border:1px solid rgba(255,255,255,0.6);
                    backdrop-filter: blur(8px);
                    transform: translateY(10px);
                    transition: transform 300ms cubic-bezier(.2,.9,.3,1), box-shadow 300ms;
                }
                .card:hover{transform: translateY(0) scale(1.01); box-shadow: 0 18px 40px rgba(171,68,140,0.18)}

                .header{
                    display:flex; gap:18px; align-items:center; margin-bottom:12px;
                }
                .avatar{
                    width:92px; height:92px; border-radius:18px; flex-shrink:0;
                    background: linear-gradient(135deg,#fff,#ffeef8);
                    display:flex; align-items:center; justify-content:center; font-size:36px; color:var(--accent);
                    box-shadow: inset 0 -6px 18px rgba(255,122,182,0.06);
                    border: 2px solid rgba(255,255,255,0.8);
                }
                h1{font-size:22px; color: #6b0b4a; margin-bottom:6px}
                p.lead{color:#6b2b5e; opacity:0.95}

                .info-grid{display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:18px}
                .row{padding:12px; border-radius:12px; background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.42)); border:1px solid rgba(255,255,255,0.5)}
                .label{font-size:12px; color:#7a2b53; opacity:0.9}
                .value{font-weight:700; color:#4a0f36; margin-top:6px}

                hr.sep{border:none; border-top:1px dashed rgba(90,20,60,0.08); margin:18px 0}

                /* ปุ่มเล่นๆ */
                .actions{display:flex; gap:12px; margin-top:18px}
                .btn{
                    padding:10px 14px; border-radius:10px; cursor:pointer; border:none; font-weight:600;
                    background: linear-gradient(90deg,var(--accent), #ff4da6);
                    color:white; box-shadow: 0 8px 20px rgba(255,122,182,0.14);
                    transition: transform 200ms, box-shadow 200ms;
                }
                .btn:active{transform:translateY(1px)}
                .btn.ghost{background:transparent; color:var(--muted); border:1px solid rgba(90,20,60,0.06)}

                /* responsive */
                @media (max-width:520px){
                    .info-grid{grid-template-columns:1fr}
                    .header{gap:12px}
                    .avatar{width:76px; height:76px; border-radius:14px}
                }

                /* small sparkle animation */
                .sparkle{
                    position:absolute; right:16px; top:12px; width:14px; height:14px; border-radius:50%; background:linear-gradient(90deg,#fff7fb,#ffdcec);
                    box-shadow:0 6px 18px rgba(255,122,182,0.12); transform-origin:center; animation:twinkle 2.4s linear infinite;
                }
                @keyframes twinkle{0%{transform:scale(.85);opacity:.9}50%{transform:scale(1.18);opacity:1}100%{transform:scale(.85);opacity:.9}}

            </style>
        </head>
        <body>
            <div class="floaters" aria-hidden="true">
                <div class="bubble b1"></div>
                <div class="bubble b2"></div>
                <div class="bubble b3"></div>
                <div class="bubble b4"></div>
            </div>

            <div class="card" role="main" aria-labelledby="title">
                <div class="sparkle" aria-hidden="true"></div>
                <div class="header">
                    <div class="avatar" aria-hidden="true">ปา</div>
                    <div>
                        <h1 id="title">ยินดีต้อนรับสู่ Server ของหนู — ปาร์ค</h1>
                        <p class="lead">นี่คือ Web Server เครื่องแรกที่สร้างเอง โดยใช้โทนสีชมพูอ่อนและลูกเล่นเล็กๆ ให้ดูน่ารัก</p>
                    </div>
                </div>

                <hr class="sep">

                <h2 style="color:#5a0b3a; margin-bottom:8px">ข้อมูลนักศึกษา</h2>

                <div class="info-grid">
                    <div class="row">
                        <div class="label">รหัสนักศึกษา</div>
                        <div class="value">69319010399</div>
                    </div>
                    <div class="row">
                        <div class="label">ชื่อ-นามสกุล</div>
                        <div class="value">นางสาวศิริลักษณ์ อบนวล</div>
                    </div>
                    <div class="row">
                        <div class="label">ชื่อเล่น</div>
                        <div class="value">ปาร์ค</div>
                    </div>
                    <div class="row">
                        <div class="label">สาขาวิชา</div>
                        <div class="value">เทคโนโลยีสารสนเทศ HIT1M</div>
                    </div>
                    <div class="row">
                        <div class="label">สถานศึกษา</div>
                        <div class="value">วิทยาลัยเทคโนโลยีชลบุรี</div>
                    </div>
                    <div class="row">
                        <div class="label">วันเกิด</div>
                        <div class="value">17/04/2551</div>
                    </div>
                </div>

                <div class="actions">
                    <button class="btn" onclick="greet()">ทักทาย</button>
                    <button class="btn ghost" onclick="showMore()">ข้อมูลเพิ่มเติม</button>
                </div>

                <div id="more" style="display:none; margin-top:14px; color:#4a0f36; font-size:14px; line-height:1.45">
                    <p>ชอบการออกแบบ UI โทนสีชมพูอ่อน พร้อมเพิ่มลูกเล่นเล็กๆ ให้เว็บไซต์ดูมีชีวิต เช่น พื้นหลังลอยได้และปุ่มที่น่ากด ✨</p>
                </div>
            </div>

            <script>
                function greet(){
                    alert('สวัสดีครับ/ค่ะ ปาร์ค — ยินดีต้อนรับสู่ Server ของฉัน 😊');
                }
                function showMore(){
                    var el = document.getElementById('more');
                    if(el.style.display === 'none'){
                        el.style.display = 'block';
                    } else {
                        el.style.display = 'none';
                    }
                }
            </script>
        </body>
        </html>
    `);
});

// 3. สั่งให้ Server เริ่มทำงานและรอรับข้อมูลที่ Port (Render จะกำหนด PORT มาให้เองอัตโนมติ)
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Server กำลังทำงานที่ Port " + listener.address().port);
});
