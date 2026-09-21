import sys, os
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

def generate_deck():
    input_template = "SIH2026-IDEA-Presentation-Format.pptx"
    output_pptx = "SIH2026_SIH26062_DevReact_Master.pptx"
    
    if not os.path.exists(input_template):
        print(f"Error: {input_template} not found!")
        return

    prs = pptx.Presentation(input_template)
    print(f"Loaded {input_template}. Total slides: {len(prs.slides)}")

    # Color Constants
    NAVY_DARK = RGBColor(0, 51, 102)     # #003366 Dark Navy
    BLUE_ACCENT = RGBColor(0, 102, 153)  # #006699 Slate Blue
    BODY_TEXT = RGBColor(35, 35, 35)     # #232323 Charcoal
    MUTED_GRAY = RGBColor(110, 110, 110) # #6E6E6E Gray
    WHITE = RGBColor(255, 255, 255)

    def update_decorations(slide, team_name="Dev React"):
        for shape in slide.shapes:
            if shape.has_text_frame:
                txt = shape.text_frame.text
                if "Your Team Name" in txt:
                    shape.text_frame.clear()
                    p = shape.text_frame.paragraphs[0]
                    p.text = team_name
                    p.font.size = Pt(11)
                    p.font.bold = True
                    p.font.color.rgb = WHITE
                    p.alignment = PP_ALIGN.CENTER
                elif "@SIH Idea submission" in txt:
                    shape.text_frame.clear()
                    p = shape.text_frame.paragraphs[0]
                    p.text = "SIH 2026 Idea Submission | PS: SIH26062 | MoES / NCPOR"
                    p.font.size = Pt(9)
                    p.font.color.rgb = MUTED_GRAY

    # ==========================================
    # SLIDE 1: Title Page
    # ==========================================
    slide1 = prs.slides[0]
    for shape in slide1.shapes:
        if shape.has_text_frame:
            tf = shape.text_frame
            if "SMART INDIA HACKATHON" in tf.text:
                tf.clear()
                p = tf.paragraphs[0]
                p.text = "SMART INDIA HACKATHON 2026"
                p.font.size = Pt(28)
                p.font.bold = True
                p.font.color.rgb = NAVY_DARK
            elif "TITLE PAGE" in tf.text:
                tf.clear()
                p = tf.paragraphs[0]
                p.text = "POLARIS: Integrated Polar Expedition Operations & Asset Suite"
                p.font.size = Pt(17)
                p.font.bold = True
                p.font.color.rgb = BLUE_ACCENT
            elif "Problem Statement ID" in tf.text:
                tf.clear()
                fields = [
                    ("Problem Statement ID –", " SIH26062"),
                    ("Problem Statement Title –", " Integrated Polar Expedition Logistics and Asset Management System"),
                    ("Theme –", " Smart Automation"),
                    ("PS Category –", " Software"),
                    ("Team ID –", " 137578"),
                    ("Team Name (Registered on portal) –", " Dev React"),
                    ("Team Leader –", " Sparsh Sharma (sparshsharmadev@gmail.com | 9448051825)"),
                    ("Institute –", " Rajkiya Engineering College Mirzapur"),
                    ("Sponsoring Organization –", " Ministry of Earth Sciences (MoES) / NCPOR, Goa")
                ]
                for idx, (label, val) in enumerate(fields):
                    p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
                    p.space_after = Pt(2)
                    r1 = p.add_run()
                    r1.text = label
                    r1.font.bold = True
                    r1.font.size = Pt(12)
                    r1.font.color.rgb = NAVY_DARK
                    
                    r2 = p.add_run()
                    r2.text = val
                    r2.font.bold = False
                    r2.font.size = Pt(12)
                    r2.font.color.rgb = BODY_TEXT

    # ==========================================
    # SLIDE 2: Idea Title & Proposed Solution
    # ==========================================
    slide2 = prs.slides[1]
    update_decorations(slide2)
    for shape in slide2.shapes:
        if shape.has_text_frame:
            tf = shape.text_frame
            if "IDEA TITLE" in tf.text:
                tf.clear()
                p = tf.paragraphs[0]
                p.text = "POLARIS: Centralized Polar Expedition ERP & Asset Operations Suite"
                p.font.size = Pt(19)
                p.font.bold = True
                p.font.color.rgb = NAVY_DARK
            elif "Proposed Solution" in tf.text:
                tf.clear()
                items = [
                    ("Proposed Solution (Idea / Prototype Overview):", "", True, NAVY_DARK, Pt(11.5)),
                    ("• Centralized digital operations hub connecting NCPOR Goa with Antarctic stations (Bharati, Maitri), Arctic base (Himadri), and icebreaker vessels (MV Vasily Golovnin).", "", False, BODY_TEXT, Pt(10)),
                    ("• Unifies 4 core pillars: Expedition Voyage Scheduling, Cold-Chain Asset Inventory, Personnel Safety, and Blizzard Emergency Response.", "", False, BODY_TEXT, Pt(10)),
                    ("Detailed Explanation of the Proposed Solution:", "", True, NAVY_DARK, Pt(11.5)),
                    ("• Expedition Voyage Planner: ", "Coordinates chartered vessel routes (Goa ➔ Cape Town ➔ Ice Shelf), cargo payload balancing, and mission Gantt milestones.", False, BODY_TEXT, Pt(10)),
                    ("• Cold-Chain Asset ERP: ", "Tracks Arctic-grade diesel, Jet A-1 aviation fuel, freeze-dried rations, and snowcat (PistenBully) vehicle spares with sub-zero shelf-life monitoring.", False, BODY_TEXT, Pt(10)),
                    ("• Personnel Safety & Roster: ", "Digital station muster rolls, field camp geofencing (Schirmacher Oasis, Larsemann Hills), and daily scientist health clearances.", False, BODY_TEXT, Pt(10)),
                    ("• Emergency SOS & Hazard Cockpit: ", "Automated 3-tier blizzard threat level tracking (Condition 1/2/3) and 1-click COSPAS-SARSAT satellite distress beacon dispatch.", False, BODY_TEXT, Pt(10)),
                    ("How it Addresses the Problem:", "", True, NAVY_DARK, Pt(11.5)),
                    ("• Eliminates disconnected paper manifests and spreadsheets; accelerates ice-edge vessel unloading reconciliation from 72h to <6h.", "", False, BODY_TEXT, Pt(10)),
                    ("• Prevents life-support failures by forecasting power generator fuel depletion curves during 14-month polar night overwintering cycles.", "", False, BODY_TEXT, Pt(10)),
                    ("Innovation and Uniqueness of the Solution:", "", True, NAVY_DARK, Pt(11.5)),
                    ("• 100% Local-First Resilience: Operates completely offline during polar satellite dropouts; auto-merges conflict-free when links flicker on.", "", False, BODY_TEXT, Pt(10)),
                    ("• Predictive Burn-Rate Modeling: Correlates ambient sub-zero temperatures (-40°C) with active headcount to predict resource exhaustion months ahead.", "", False, BODY_TEXT, Pt(10))
                ]
                for idx, (head, body, is_header, col, sz) in enumerate(items):
                    p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
                    p.space_after = Pt(2) if not is_header else Pt(4)
                    if is_header:
                        p.space_before = Pt(4)
                    r1 = p.add_run()
                    r1.text = head
                    r1.font.bold = True
                    r1.font.size = sz
                    r1.font.color.rgb = col
                    if body:
                        r2 = p.add_run()
                        r2.text = body
                        r2.font.bold = False
                        r2.font.size = sz
                        r2.font.color.rgb = BODY_TEXT

    # ==========================================
    # SLIDE 3: Technical Approach
    # ==========================================
    slide3 = prs.slides[2]
    update_decorations(slide3)
    for shape in slide3.shapes:
        if shape.has_text_frame:
            tf = shape.text_frame
            if "TECHNICAL APPROACH" in tf.text:
                tf.clear()
                p = tf.paragraphs[0]
                p.text = "TECHNICAL APPROACH & SYSTEM ARCHITECTURE"
                p.font.size = Pt(19)
                p.font.bold = True
                p.font.color.rgb = NAVY_DARK
            elif "Technologies to be used" in tf.text:
                tf.clear()
                items = [
                    ("Technologies to be Used:", "", True, NAVY_DARK, Pt(11.5)),
                    ("• Local-First Offline Sync: ", "Automerge / Yjs CRDTs (Conflict-Free Replicated Data Types) paired with client-side IndexedDB & Service Workers for sub-5ms local transactions with zero internet dependency.", False, BODY_TEXT, Pt(10)),
                    ("• Distributed Database Architecture: ", "Lightweight SQLite edge databases embedded at polar stations and ships, syncing with an enterprise PostgreSQL + PostGIS master cluster at NCPOR Goa.", False, BODY_TEXT, Pt(10)),
                    ("• Transport & Satellite Protocol: ", "NATS / MQTT store-and-forward messaging over Iridium Certus and Starlink Maritime using compressed binary delta payloads to minimize satellite bandwidth bills.", False, BODY_TEXT, Pt(10)),
                    ("• Polar GIS Engine: ", "Configured with EPSG:3031 (Antarctic Polar Stereographic Projection) to completely eliminate Web Mercator polar map distortion.", False, BODY_TEXT, Pt(10)),
                    ("• Edge Machine Learning: ", "Resource burn-rate regression models exported to ONNX format and executed on-device via onnxruntime with zero cloud dependency.", False, BODY_TEXT, Pt(10)),
                    ("• Station Edge Microservices: ", "Containerized Python / Go runtime deployed via Docker on rugged edge hardware.", False, BODY_TEXT, Pt(10)),
                    ("Methodology and Process for Implementation:", "", True, NAVY_DARK, Pt(11.5)),
                    ("• Step 1 (Local Edge Capture): ", "Field officers log cargo movements, muster check-ins, or station telemetry locally; data persists in local IndexedDB in <5ms.", False, BODY_TEXT, Pt(10)),
                    ("• Step 2 (Conflict-Free Replicated State): ", "Edge nodes log state mutations; CRDT algorithms mathematically merge multi-station concurrent edits without data collisions.", False, BODY_TEXT, Pt(10)),
                    ("• Step 3 (Burst Delta Synchronization): ", "When intermittent satellite windows open, compressed binary delta packets auto-reconcile with NCPOR Goa HQ.", False, BODY_TEXT, Pt(10)),
                    ("• Step 4 (Automated Hazard Indexing): ", "Live anemometer and weather feeds automatically enforce safety protocols (wind gusts >55 kts trigger Blizzard Condition 1 Lockout).", False, BODY_TEXT, Pt(10))
                ]
                for idx, (head, body, is_header, col, sz) in enumerate(items):
                    p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
                    p.space_after = Pt(2) if not is_header else Pt(4)
                    if is_header:
                        p.space_before = Pt(4)
                    r1 = p.add_run()
                    r1.text = head
                    r1.font.bold = True
                    r1.font.size = sz
                    r1.font.color.rgb = col
                    if body:
                        r2 = p.add_run()
                        r2.text = body
                        r2.font.bold = False
                        r2.font.size = sz
                        r2.font.color.rgb = BODY_TEXT

    # ==========================================
    # SLIDE 4: Feasibility and Viability
    # ==========================================
    slide4 = prs.slides[3]
    update_decorations(slide4)
    for shape in slide4.shapes:
        if shape.has_text_frame:
            tf = shape.text_frame
            if "FEASIBILITY AND VIABILITY" in tf.text:
                tf.clear()
                p = tf.paragraphs[0]
                p.text = "FEASIBILITY ANALYSIS & POLAR RISK MITIGATION"
                p.font.size = Pt(19)
                p.font.bold = True
                p.font.color.rgb = NAVY_DARK
            elif "Analysis of the feasibility" in tf.text:
                tf.clear()
                items = [
                    ("Analysis of Feasibility:", "", True, NAVY_DARK, Pt(11.5)),
                    ("• Technical Feasibility: ", "Built on proven, low-overhead containerized standards (Docker, SQLite, PWA); operates reliably on existing station edge hardware and rugged tablets without specialized procurement.", False, BODY_TEXT, Pt(10)),
                    ("• Operational Viability: ", "Replaces vulnerable paper manifests and disconnected Excel sheets, fitting seamlessly into NCPOR's annual expedition cycles.", False, BODY_TEXT, Pt(10)),
                    ("• Air-Gapped Sovereign Design: ", "Zero dependency on foreign commercial cloud providers guarantees complete data privacy and compliance with government IT security mandates.", False, BODY_TEXT, Pt(10)),
                    ("Potential Challenges and Risks:", "", True, NAVY_DARK, Pt(11.5)),
                    ("• Severe Satellite Blackouts: ", "Extended ionospheric blizzards and solar storms frequently cut off polar satellite connectivity for weeks.", False, BODY_TEXT, Pt(10)),
                    ("• Extreme Cold Environmental Stress (-40°C): ", "Severe sub-zero conditions risk drive freezing, thermal contraction, and station hardware failures.", False, BODY_TEXT, Pt(10)),
                    ("• Strict International Polar Governance: ", "Antarctic operations carry legal liability for hazardous waste disposal and fuel bunkering compliance.", False, BODY_TEXT, Pt(10)),
                    ("Strategies for Overcoming These Challenges:", "", True, NAVY_DARK, Pt(11.5)),
                    ("• Store-and-Forward Sync Queue: ", "Local edge nodes operate autonomously indefinitely; state changes queue safely and sync in micro-bursts upon link restoration.", False, BODY_TEXT, Pt(10)),
                    ("• Dual-Node Redundant Clustering: ", "Mirrored active-passive edge instances at Bharati and Maitri with automated hourly encrypted flash backups.", False, BODY_TEXT, Pt(10)),
                    ("• Madrid Protocol Environmental Ledger: ", "Automated compliance tracking for hazardous materials, fuel bunkering, and mandatory return waste manifests.", False, BODY_TEXT, Pt(10))
                ]
                for idx, (head, body, is_header, col, sz) in enumerate(items):
                    p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
                    p.space_after = Pt(2) if not is_header else Pt(4)
                    if is_header:
                        p.space_before = Pt(4)
                    r1 = p.add_run()
                    r1.text = head
                    r1.font.bold = True
                    r1.font.size = sz
                    r1.font.color.rgb = col
                    if body:
                        r2 = p.add_run()
                        r2.text = body
                        r2.font.bold = False
                        r2.font.size = sz
                        r2.font.color.rgb = BODY_TEXT

    # ==========================================
    # SLIDE 5: Impact and Benefits
    # ==========================================
    slide5 = prs.slides[4]
    update_decorations(slide5)
    for shape in slide5.shapes:
        if shape.has_text_frame:
            tf = shape.text_frame
            if "IMPACT AND BENEFITS" in tf.text:
                tf.clear()
                p = tf.paragraphs[0]
                p.text = "STRATEGIC, ECONOMIC & LIFE-SAFETY IMPACT"
                p.font.size = Pt(19)
                p.font.bold = True
                p.font.color.rgb = NAVY_DARK
            elif "Potential impact" in tf.text:
                tf.clear()
                items = [
                    ("Potential Impact on Target Audience (MoES, NCPOR & Expedition Crews):", "", True, NAVY_DARK, Pt(11.5)),
                    ("• Atmanirbhar Polar Governance: ", "Delivers a sovereign, indigenously developed polar operational backbone, elevating India's leadership standing at Antarctic Treaty Consultative Meetings (ATCM).", False, BODY_TEXT, Pt(10)),
                    ("• Accelerated Ice-Edge Offload: ", "Slashes chartered icebreaker cargo offload manifest reconciliation from 72 hours to under 6 hours on the fast ice shelf.", False, BODY_TEXT, Pt(10)),
                    ("• 360° Real-Time Operational Visibility: ", "NCPOR leadership gains continuous situational awareness over station occupancy, fuel health, and ongoing scientific field traverses.", False, BODY_TEXT, Pt(10)),
                    ("Benefits of the Solution:", "", True, NAVY_DARK, Pt(11.5)),
                    ("• Economic & Logistical Benefits: ", "", True, BLUE_ACCENT, Pt(10)),
                    ("  - Prevents multi-crore supply chain losses from misplaced machinery spares and damaged perishable rations.", "", False, BODY_TEXT, Pt(9.5)),
                    ("  - Eliminates costly emergency air-charters from Cape Town through accurate seasonal burn-rate forecasting.", "", False, BODY_TEXT, Pt(9.5)),
                    ("  - Protects wintering crews by ensuring unbroken power generator fuel reserves throughout 14-month polar nights.", "", False, BODY_TEXT, Pt(9.5)),
                    ("• Social & Human Safety Benefits (Target Zero Casualties): ", "", True, BLUE_ACCENT, Pt(10)),
                    ("  - Real-time geofenced field tracking and automated weather lockouts prevent whiteout disorientation.", "", False, BODY_TEXT, Pt(9.5)),
                    ("  - Slashes blizzard Search & Rescue (SAR) dispatch latency from hours to under 2 minutes.", "", False, BODY_TEXT, Pt(9.5)),
                    ("• Environmental Compliance Benefits (Madrid Protocol): ", "", True, BLUE_ACCENT, Pt(10)),
                    ("  - Automated tracking of hazardous chemicals, fuel bunkering, and mandatory return-waste back to India.", "", False, BODY_TEXT, Pt(9.5))
                ]
                for idx, (head, body, is_header, col, sz) in enumerate(items):
                    p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
                    p.space_after = Pt(2) if not is_header else Pt(3)
                    if is_header and not head.startswith("  -"):
                        p.space_before = Pt(3)
                    r1 = p.add_run()
                    r1.text = head
                    r1.font.bold = True
                    r1.font.size = sz
                    r1.font.color.rgb = col
                    if body:
                        r2 = p.add_run()
                        r2.text = body
                        r2.font.bold = False
                        r2.font.size = sz
                        r2.font.color.rgb = BODY_TEXT

    # ==========================================
    # SLIDE 6: Research and References
    # ==========================================
    slide6 = prs.slides[5]
    update_decorations(slide6)
    for shape in slide6.shapes:
        if shape.has_text_frame:
            tf = shape.text_frame
            if "RESEARCH" in tf.text:
                tf.clear()
                p = tf.paragraphs[0]
                p.text = "RESEARCH FOUNDATIONS, STANDARDS & REFERENCES"
                p.font.size = Pt(19)
                p.font.bold = True
                p.font.color.rgb = NAVY_DARK
            elif "Details / Links" in tf.text:
                tf.clear()
                items = [
                    ("Institutional Polar Research Foundations:", "", True, NAVY_DARK, Pt(11.5)),
                    ("1. National Centre for Polar and Ocean Research (NCPOR): ", "Official Logistics & Station Operations Documentation for the 41st, 42nd, 43rd, and 44th Indian Scientific Expeditions to Antarctica (ISEA). (URL: ncpor.res.in)", False, BODY_TEXT, Pt(10)),
                    ("2. COMNAP Polar Standards: ", "Council of Managers of National Antarctic Programs — International standards for Antarctic station safety, environmental stewardship, and air operations. (URL: comnap.aq)", False, BODY_TEXT, Pt(10)),
                    ("3. SCAR Best Practices: ", "Scientific Committee on Antarctic Research — Data governance and environmental monitoring guidelines. (URL: scar.org)", False, BODY_TEXT, Pt(10)),
                    ("4. The Protocol on Environmental Protection to the Antarctic Treaty (Madrid Protocol): ", "Annex III (Waste Disposal and Management) & Annex IV (Prevention of Marine Pollution). (URL: ats.aq)", False, BODY_TEXT, Pt(10)),
                    ("System Engineering & Distributed Computing Standards:", "", True, NAVY_DARK, Pt(11.5)),
                    ("5. Local-First & CRDT Architecture: ", "Kleppmann, M. et al., 'Local-First Software: You own your data, in spite of the cloud', Onward! ACM; Conflict-Free Replicated Data Types (Automerge / Yjs).", False, BODY_TEXT, Pt(10)),
                    ("6. Antarctic Geospatial Coordinate Reference System: ", "EPSG:3031 / WGS 84 Antarctic Polar Stereographic Projection Standard (European Petroleum Survey Group).", False, BODY_TEXT, Pt(10)),
                    ("7. Low-Bandwidth Transport Protocols: ", "ISO/IEC 20922 (MQTT Standard) & NATS Messaging Protocol for high-latency, packet-drop prone satellite communication links.", False, BODY_TEXT, Pt(10)),
                    ("8. COSPAS-SARSAT Emergency Standards: ", "International specification for 406 MHz satellite distress beacons and Search & Rescue (SAR) tracking protocols.", False, BODY_TEXT, Pt(10))
                ]
                for idx, (head, body, is_header, col, sz) in enumerate(items):
                    p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
                    p.space_after = Pt(2) if not is_header else Pt(4)
                    if is_header:
                        p.space_before = Pt(4)
                    r1 = p.add_run()
                    r1.text = head
                    r1.font.bold = True
                    r1.font.size = sz
                    r1.font.color.rgb = col
                    if body:
                        r2 = p.add_run()
                        r2.text = body
                        r2.font.bold = False
                        r2.font.size = sz
                        r2.font.color.rgb = BODY_TEXT

    # ==========================================
    # Drop Instruction Slide (Slide 7)
    # ==========================================
    if len(prs.slides) >= 7:
        rId = prs.slides._sldIdLst[6].rId
        prs.part.drop_rel(rId)
        del prs.slides._sldIdLst[6]
        print("Dropped slide 7 (Instructions slide).")

    prs.save(output_pptx)
    # Also save as SIH2026_SIH26062_DevReact.pptx and ppt.pptx
    prs.save("SIH2026_SIH26062_DevReact.pptx")
    prs.save("ppt.pptx")
    print(f"Successfully generated new PPTX: {output_pptx}")

if __name__ == "__main__":
    generate_deck()
