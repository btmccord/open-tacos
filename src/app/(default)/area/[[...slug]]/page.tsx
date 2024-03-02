import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { validate } from 'uuid'
import { MapPinLine, Lightbulb, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Markdown from 'react-markdown'

import PhotoMontage, { UploadPhotoCTA } from '@/components/media/PhotoMontage'
import { getArea } from '@/js/graphql/getArea'
import { StickyHeaderContainer } from '@/app/(default)/components/ui/StickyHeaderContainer'
import { AreaCrumbs } from '@/components/breadcrumbs/AreaCrumbs'
import { ArticleLastUpdate } from '@/components/edit/ArticleLastUpdate'
import { getMapHref, getFriendlySlug, getAreaPageFriendlyUrl, sanitizeName } from '@/js/utils'
import { LazyAreaMap } from '@/components/maps/AreaMap'
import { AreaPageContainer } from '@/app/(default)/components/ui/AreaPageContainer'
import { AreaPageActions } from '../../components/AreaPageActions'
import { SubAreasSection } from './sections/SubAreasSection'
import { ClimbListSection } from './sections/ClimbListSection'
import { CLIENT_CONFIG } from '@/js/configs/clientConfig'
import { PageBanner as LCOBanner } from '@/components/lco/PageBanner'
import { Topo } from '../../components/Topo/Topo'
import testImage from './topo2.jpg'
/**
 * Page cache settings
 */
export const revalidate = 86400 // 24 hours
export const fetchCache = 'force-no-store' // opt out of Nextjs version of 'fetch'

const testdata = '["Layer",{"applyMatrix":true,"data":{"topoVersion":1,"imgHeight":1082.40002,"imgOrigin":["Point",178.73996,0],"topoOriginBounds":["Rectangle",386.29432,84.63868,435.15287,905.36132]},"children":[["Group",{"name":"strokeGroup","applyMatrix":true,"children":[["Path",{"name":"f04ac963-2c05-50d2-a830-b811fb63a609topoStrokePath","applyMatrix":true,"segments":[[607.66669,954],[[639.66669,718],[-4.61791,71.04482],[3.18209,-48.95518]],[[633.66669,554],[-11.85384,45.59171],[11.54616,-44.40829]],[[717.66669,418],[-21.42906,42.43795],[9.17094,-18.16205]],[[735.66669,352],[-0.38171,20.30691],[1.11829,-59.49309]],[[722.66669,152],[-3.26106,58.46622],[0.93894,-16.83378]],[749.66669,101]],"strokeColor":[1,1,1],"strokeWidth":7,"strokeJoin":"round"}],["Path",{"name":"056891ef-9e59-5aed-8213-d240f862797btopoStrokePath","applyMatrix":true,"segments":[[477.66669,927],[[478.66669,781],[2.52902,43.62554],[-2.27098,-39.17446]],[[461.66669,651],[-4.44406,38.05225],[5.15594,-44.14775]],[[510.66669,507],[-13.39653,43.5859],[7.90347,-25.7141]],[[532.66669,420],[-2.29215,26.50295],[2.50785,-28.99705]],[[526.66669,322],[-5.78585,27.64349],[5.01415,-23.95651]],[[568.66669,248],[-11.50352,22.76487],[16.99648,-33.63513]],[621.66669,134]],"strokeColor":[1,1,1],"strokeWidth":7,"strokeJoin":"round"}],["Path",{"name":"5268bb2d-6363-59f0-aa57-c21282fcf103topoStrokePath","applyMatrix":true,"segments":[[527.66669,928],[[537.66669,736],[-8.44163,56.84911],[10.75837,-72.45089]],[[591.66669,497],[-16.38407,71.65779],[10.91593,-47.74221]],[[628.66669,338],[-12.24855,47.38782],[6.05145,-23.41218]],[[652.66669,261],[-5.6116,23.5052],[10.2884,-43.0948]],[681.66669,116]],"strokeColor":[1,1,1],"strokeWidth":7,"strokeJoin":"round"}],["Path",{"name":"11c8634d-a41a-579b-89ac-39f087bed27atopoStrokePath","applyMatrix":true,"segments":[[439.66669,902],[[449.66669,799],[6.53285,27.89704],[-4.56715,-19.50296]],[[402.66669,744],[6.29439,19.88228],[-12.60561,-39.81772]],[[386.66669,600],[-1.88757,42.72763],[1.41243,-31.97237]],[[413.66669,495],[-10.77531,30.53005],[9.02469,-25.56995]],[[452.66669,413],[-4.73965,25.83873],[4.56035,-24.86127]],[[444.66669,326],[-5.35515,25.02501],[10.24485,-47.87499]],[504.66669,170]],"strokeColor":[1,1,1],"strokeWidth":7,"strokeJoin":"round"}],["Path",{"name":"9230961a-0a0d-5047-a038-951f4d47c05ftopoStrokePath","applyMatrix":true,"segments":[[477.66669,927],[[478.66669,781],[2.52902,43.62554],[-2.27098,-39.17446]],[[461.66669,651],[-4.44406,38.05225],[5.15594,-44.14775]],[[510.66669,507],[-13.39653,43.5859],[4.35781,-14.17822]],[[525.04953,459.10222],[-4.48127,16.78424],[-13.06747,-29.08566]],[[448.26879,369.08302],[3.27006,15.67377],[-3.20352,-15.35485]],[[444.66669,326],[-2.65005,12.3839],[10.24485,-47.87499]],[504.66669,170]],"strokeColor":[1,1,1],"strokeWidth":7,"strokeJoin":"round"}],["Path",{"name":"ebf598d9-088c-54d1-be81-5e28c46801c8topoStrokePath","applyMatrix":true,"segments":[[752.66669,478],[[765.66669,400],[-4.23478,23.34053],[8.66522,-47.75947]],[[795.66669,241],[-9.39576,47.6194],[3.80424,-19.2806]],[809.66669,177]],"strokeColor":[1,1,1],"strokeWidth":7,"strokeJoin":"round"}],["Path",{"name":"3c75783a-0ce9-50ca-9198-445ebf241ac8topoStrokePath","applyMatrix":true,"segments":[[719.66669,973],[[753.66669,823],[-4.00392,45.31713],[2.59608,-29.38287]],[[741.66669,724],[-0.55885,29.43276],[0.34115,-17.96724]],[[756.66669,665],[4.97464,15.65192],[-7.32536,-23.04808]],[[700.66669,595],[10.81424,23.27812],[-6.88576,-14.82188]],[697.66669,538]],"strokeColor":[1,1,1],"strokeWidth":7,"strokeJoin":"round"}]]}],["Group",{"name":"3c75783a-0ce9-50ca-9198-445ebf241ac8","applyMatrix":true,"data":{"id":"3c75783a-0ce9-50ca-9198-445ebf241ac8","routeNumber":12,"routeName":"Preacher Man","scale":1,"sharesStartWith":[]},"children":[["CompoundPath",{"name":"topoDashPath","applyMatrix":true,"strokeColor":[1,1,1],"strokeWidth":5,"dashArray":[10]}],["CompoundPath",{"name":"topoPathTermination","applyMatrix":true,"data":{"type":"anchor"},"children":[["Path",{"applyMatrix":true,"segments":[[[697.48321,539.99157],[5.49956,0.50666],[-5.49956,-0.50666]],[[688.44277,529.11635],[-0.50666,5.49956],[0.50666,-5.49956]],[[699.31799,520.0759],[-5.49956,-0.50666],[5.49956,0.50666]],[[708.35843,530.95112],[0.50666,-5.49956],[-0.50666,5.49956]]],"closed":true}]],"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoNumberBg","applyMatrix":true,"segments":[[[708.55002,990],[0,0],[-2.76142,0]],[[703.55002,985],[0,2.76142],[0,0]],[[703.55002,961],[0,0],[0,-2.76142]],[[708.55002,956],[-2.76142,0],[0,0]],[[730.78335,956],[0,0],[2.76142,0]],[[735.78335,961],[0,-2.76142],[0,0]],[[735.78335,985],[0,0],[0,2.76142]],[[730.78335,990],[2.76142,0],[0,0]]],"closed":true,"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoPath","applyMatrix":true,"segments":[[719.66669,973],[[753.66669,823],[-4.00392,45.31713],[2.59608,-29.38287]],[[741.66669,724],[-0.55885,29.43276],[0.34115,-17.96724]],[[756.66669,665],[4.97464,15.65192],[-7.32536,-23.04808]],[[700.66669,595],[10.81424,23.27812],[-6.88576,-14.82188]],[697.66669,538]],"strokeColor":[0,0,0],"strokeWidth":2,"strokeJoin":"round"}],["PointText",{"name":"topoNumber","applyMatrix":false,"matrix":[1,0,0,1,708.55002,979],"content":"12","fillColor":[1,1,1],"fontSize":20,"leading":24}]]}],["Group",{"name":"9230961a-0a0d-5047-a038-951f4d47c05f","applyMatrix":true,"data":{"id":"9230961a-0a0d-5047-a038-951f4d47c05f","routeNumber":7,"routeName":"The Rebait","scale":1,"sharesStartWith":["056891ef-9e59-5aed-8213-d240f862797b"]},"children":[["CompoundPath",{"name":"topoDashPath","applyMatrix":true,"strokeColor":[1,1,1],"strokeWidth":5,"dashArray":[10]}],["CompoundPath",{"name":"topoPathTermination","applyMatrix":true,"visible":false,"data":{"type":"anchor"},"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoNumberBg","applyMatrix":true,"segments":[[[463.77503,944],[0,0],[-2.76142,0]],[[458.77503,939],[0,2.76142],[0,0]],[[458.77503,915],[0,0],[0,-2.76142]],[[463.77503,910],[-2.76142,0],[0,0]],[[491.55836,910],[0,0],[2.76142,0]],[[496.55836,915],[0,-2.76142],[0,0]],[[496.55836,939],[0,0],[0,2.76142]],[[491.55836,944],[2.76142,0],[0,0]]],"closed":true,"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoPath","applyMatrix":true,"segments":[[477.66669,927],[[478.66669,781],[2.52902,43.62554],[-2.27098,-39.17446]],[[461.66669,651],[-4.44406,38.05225],[5.15594,-44.14775]],[[510.66669,507],[-13.39653,43.5859],[4.35781,-14.17822]],[[525.04953,459.10222],[-4.48127,16.78424],[-13.06747,-29.08566]],[[448.26879,369.08302],[3.27006,15.67378],[-3.20352,-15.35485]],[[444.66669,326],[-2.65005,12.3839],[10.24485,-47.87499]],[504.66669,170]],"strokeColor":[0,0,0],"strokeWidth":2,"strokeJoin":"round"}],["PointText",{"name":"topoNumber","applyMatrix":false,"matrix":[1,0,0,1,463.77502,933],"content":"7,8","fillColor":[1,1,1],"fontSize":20,"leading":24}]]}],["Path",{"applyMatrix":true,"segments":[[[472.10835,944],[0,0],[-2.76142,0]],[[467.10835,939],[0,2.76142],[0,0]],[[467.10835,915],[0,0],[0,-2.76142]],[[472.10835,910],[-2.76142,0],[0,0]],[[483.22502,910],[0,0],[2.76142,0]],[[488.22502,915],[0,-2.76142],[0,0]],[[488.22502,939],[0,0],[0,2.76142]],[[483.22502,944],[2.76142,0],[0,0]]],"closed":true}],["Group",{"name":"5268bb2d-6363-59f0-aa57-c21282fcf103","applyMatrix":true,"data":{"id":"5268bb2d-6363-59f0-aa57-c21282fcf103","routeNumber":9,"routeName":"Sister of Mercy","scale":1,"sharesStartWith":[]},"children":[["CompoundPath",{"name":"topoDashPath","applyMatrix":true,"strokeColor":[1,1,1],"strokeWidth":5,"dashArray":[10]}],["CompoundPath",{"name":"topoPathTermination","applyMatrix":true,"data":{"type":"anchor"},"children":[["Path",{"applyMatrix":true,"segments":[[[681.30549,117.96711],[5.43204,0.99742],[-5.43204,-0.99742]],[[673.27591,106.32556],[-0.99742,5.43204],[0.99742,-5.43204]],[[684.91746,98.29598],[-5.43204,-0.99742],[5.43204,0.99742]],[[692.94704,109.93753],[0.99742,-5.43204],[-0.99742,5.43204]]],"closed":true}]],"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoNumberBg","applyMatrix":true,"segments":[[[522.10835,945],[0,0],[-2.76142,0]],[[517.10835,940],[0,2.76142],[0,0]],[[517.10835,916],[0,0],[0,-2.76142]],[[522.10835,911],[-2.76142,0],[0,0]],[[533.22502,911],[0,0],[2.76142,0]],[[538.22502,916],[0,-2.76142],[0,0]],[[538.22502,940],[0,0],[0,2.76142]],[[533.22502,945],[2.76142,0],[0,0]]],"closed":true,"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoPath","applyMatrix":true,"segments":[[527.66669,928],[[537.66669,736],[-8.44163,56.84911],[10.75837,-72.45089]],[[591.66669,497],[-16.38407,71.65779],[10.91593,-47.74221]],[[628.66669,338],[-12.24855,47.38782],[6.05145,-23.41218]],[[652.66669,261],[-5.6116,23.5052],[10.2884,-43.0948]],[681.66669,116]],"strokeColor":[0,0,0],"strokeWidth":2,"strokeJoin":"round"}],["PointText",{"name":"topoNumber","applyMatrix":false,"matrix":[1,0,0,1,522.10835,934],"content":"9","fillColor":[1,1,1],"fontSize":20,"leading":24}]]}],["Group",{"name":"11c8634d-a41a-579b-89ac-39f087bed27a","applyMatrix":true,"data":{"id":"11c8634d-a41a-579b-89ac-39f087bed27a","routeNumber":6,"routeName":"Shark Bait","scale":1,"sharesStartWith":[]},"children":[["CompoundPath",{"name":"topoPathTermination","applyMatrix":true,"data":{"type":"anchor"},"children":[["Path",{"applyMatrix":true,"segments":[[[503.83063,171.81687],[5.01715,2.30871],[-5.01715,-2.30871]],[[498.92657,158.55225],[-2.30871,5.01715],[2.30871,-5.01715]],[[512.19119,153.64818],[-5.01715,-2.30871],[5.01715,2.30871]],[[517.09525,166.91281],[2.30871,-5.01715],[-2.30871,5.01715]]],"closed":true}]],"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoNumberBg","applyMatrix":true,"segments":[[[434.10835,919],[0,0],[-2.76142,0]],[[429.10835,914],[0,2.76142],[0,0]],[[429.10835,890],[0,0],[0,-2.76142]],[[434.10835,885],[-2.76142,0],[0,0]],[[445.22502,885],[0,0],[2.76142,0]],[[450.22502,890],[0,-2.76142],[0,0]],[[450.22502,914],[0,0],[0,2.76142]],[[445.22502,919],[2.76142,0],[0,0]]],"closed":true,"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoPath","applyMatrix":true,"segments":[[439.66669,902],[[449.66669,799],[6.53285,27.89704],[-4.56715,-19.50296]],[[402.66669,744],[6.29439,19.88228],[-12.60561,-39.81772]],[[386.66669,600],[-1.88757,42.72763],[1.41243,-31.97237]],[[413.66669,495],[-10.77531,30.53005],[9.02469,-25.56995]],[[452.66669,413],[-4.73965,25.83873],[4.56035,-24.86127]],[[444.66669,326],[-5.35515,25.02501],[10.24485,-47.87499]],[504.66669,170]],"strokeColor":[0,0,0],"strokeWidth":2,"strokeJoin":"round"}],["CompoundPath",{"name":"topoDashPath","applyMatrix":true,"children":[["Path",{"name":"11c8634d-a41a-579b-89ac-39f087bed27aDashSegment","applyMatrix":true,"segments":[[[402.66669,744],[0,0],[-12.60561,-39.81772]],[[386.66669,600],[-1.88757,42.72763],[0,0]]],"strokeColor":[1,0,0],"strokeWidth":6}]],"strokeColor":[1,1,1],"strokeWidth":5,"dashArray":[10]}],["PointText",{"name":"topoNumber","applyMatrix":false,"matrix":[1,0,0,1,434.10835,908],"content":"6","fillColor":[1,1,1],"fontSize":20,"leading":24}]]}],["Group",{"name":"056891ef-9e59-5aed-8213-d240f862797b","applyMatrix":true,"data":{"id":"056891ef-9e59-5aed-8213-d240f862797b","routeNumber":8,"routeName":"True Value","scale":1,"sharesStartWith":["9230961a-0a0d-5047-a038-951f4d47c05f"]},"children":[["CompoundPath",{"name":"topoDashPath","applyMatrix":true,"strokeColor":[1,1,1],"strokeWidth":5,"dashArray":[10]}],["Path",{"name":"topoPath 1","applyMatrix":true,"segments":[[477.66669,927],[[478.66669,781],[2.52902,43.62554],[-2.27098,-39.17446]],[[461.66669,651],[-4.44406,38.05225],[5.15594,-44.14775]],[[510.66669,507],[-13.39653,43.5859],[4.35781,-14.17822]],[[525.04953,459.10222],[-4.48127,16.78424],[3.64611,-13.65623]]],"strokeColor":[0,0,0],"strokeWidth":2,"strokeJoin":"round"}],["CompoundPath",{"name":"topoPathTermination","applyMatrix":true,"data":{"type":"anchor"},"children":[["Path",{"applyMatrix":true,"segments":[[[620.84899,135.82521],[5.04017,2.258],[-5.04017,-2.258]],[[615.81143,122.61071],[-2.258,5.04017],[2.258,-5.04017]],[[629.02593,117.57315],[-5.04017,-2.258],[5.04017,2.258]],[[634.06349,130.78764],[2.258,-5.04017],[-2.258,5.04017]]],"closed":true}]],"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoNumberBg","applyMatrix":true,"segments":[[[463.77502,944],[0,0],[-2.76142,0]],[[458.77502,939],[0,2.76142],[0,0]],[[458.77502,915],[0,0],[0,-2.76142]],[[463.77502,910],[-2.76142,0],[0,0]],[[491.55835,910],[0,0],[2.76142,0]],[[496.55835,915],[0,-2.76142],[0,0]],[[496.55835,939],[0,0],[0,2.76142]],[[491.55835,944],[2.76142,0],[0,0]]],"closed":true,"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoPath","applyMatrix":true,"segments":[[477.66669,927],[[478.66669,781],[2.52902,43.62554],[-2.27098,-39.17446]],[[461.66669,651],[-4.44406,38.05225],[5.15594,-44.14775]],[[510.66669,507],[-13.39653,43.5859],[7.90347,-25.7141]],[[532.66669,420],[-2.29215,26.50295],[2.50785,-28.99705]],[[526.66669,322],[-5.78585,27.64349],[5.01415,-23.95651]],[[568.66669,248],[-11.50352,22.76487],[16.99648,-33.63513]],[621.66669,134]],"strokeColor":[0,0,0],"strokeWidth":2,"strokeJoin":"round"}],["PointText",{"name":"topoNumber","applyMatrix":false,"matrix":[1,0,0,1,463.77502,933],"content":"7,8","fillColor":[1,1,1],"fontSize":20,"leading":24}]]}],["Path",{"applyMatrix":true,"segments":[[[463.77502,944],[0,0],[-2.76142,0]],[[458.77502,939],[0,2.76142],[0,0]],[[458.77502,915],[0,0],[0,-2.76142]],[[463.77502,910],[-2.76142,0],[0,0]],[[491.55836,910],[0,0],[2.76142,0]],[[496.55836,915],[0,-2.76142],[0,0]],[[496.55836,939],[0,0],[0,2.76142]],[[491.55836,944],[2.76142,0],[0,0]]],"closed":true}],["Group",{"name":"f04ac963-2c05-50d2-a830-b811fb63a609","applyMatrix":true,"data":{"id":"f04ac963-2c05-50d2-a830-b811fb63a609","routeNumber":10,"routeName":"Mr. Slate","scale":1,"sharesStartWith":[]},"children":[["CompoundPath",{"name":"topoDashPath","applyMatrix":true,"strokeColor":[1,1,1],"strokeWidth":5,"dashArray":[10]}],["CompoundPath",{"name":"topoPathTermination","applyMatrix":true,"data":{"type":"anchor"},"children":[["Path",{"applyMatrix":true,"segments":[[[748.45373,102.5902],[4.39121,3.3495],[-4.39121,-3.3495]],[[746.56754,88.57441],[-3.3495,4.39121],[3.3495,-4.39121]],[[760.58332,86.68822],[-4.39121,-3.3495],[4.39121,3.3495]],[[762.46951,100.70401],[3.3495,-4.39121],[-3.3495,4.39121]]],"closed":true}]],"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoNumberBg","applyMatrix":true,"segments":[[[596.55002,971],[0,0],[-2.76142,0]],[[591.55002,966],[0,2.76142],[0,0]],[[591.55002,942],[0,0],[0,-2.76142]],[[596.55002,937],[-2.76142,0],[0,0]],[[618.78335,937],[0,0],[2.76142,0]],[[623.78335,942],[0,-2.76142],[0,0]],[[623.78335,966],[0,0],[0,2.76142]],[[618.78335,971],[2.76142,0],[0,0]]],"closed":true,"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoPath","applyMatrix":true,"segments":[[607.66669,954],[[639.66669,718],[-4.61791,71.04482],[3.18209,-48.95518]],[[633.66669,554],[-11.85384,45.59171],[11.54616,-44.40829]],[[717.66669,418],[-21.42906,42.43795],[9.17094,-18.16205]],[[735.66669,352],[-0.38171,20.30691],[1.11829,-59.49309]],[[722.66669,152],[-3.26106,58.46622],[0.93894,-16.83378]],[749.66669,101]],"strokeColor":[0,0,0],"strokeWidth":2,"strokeJoin":"round"}],["PointText",{"name":"topoNumber","applyMatrix":false,"matrix":[1,0,0,1,596.55002,960],"content":"10","fillColor":[1,1,1],"fontSize":20,"leading":24}]]}],["Group",{"name":"ebf598d9-088c-54d1-be81-5e28c46801c8","applyMatrix":true,"data":{"id":"ebf598d9-088c-54d1-be81-5e28c46801c8","routeNumber":11,"routeName":"It Takes a Thief","scale":1,"sharesStartWith":[]},"children":[["CompoundPath",{"name":"topoDashPath","applyMatrix":true,"strokeColor":[1,1,1],"strokeWidth":5,"dashArray":[10]}],["CompoundPath",{"name":"topoPathTermination","applyMatrix":true,"data":{"type":"anchor"},"children":[["Path",{"applyMatrix":true,"segments":[[[809.22211,178.94996],[5.38467,1.22767],[-5.38467,-1.22767]],[[801.6952,166.97726],[-1.22767,5.38467],[1.22767,-5.38467]],[[813.6679,159.45035],[-5.38467,-1.22767],[5.38467,1.22767]],[[821.19481,171.42305],[1.22767,-5.38467],[-1.22767,5.38467]]],"closed":true}]],"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoNumberBg","applyMatrix":true,"segments":[[[742.29169,495],[0,0],[-2.76142,0]],[[737.29169,490],[0,2.76142],[0,0]],[[737.29169,466],[0,0],[0,-2.76142]],[[742.29169,461],[-2.76142,0],[0,0]],[[763.04169,461],[0,0],[2.76142,0]],[[768.04169,466],[0,-2.76142],[0,0]],[[768.04169,490],[0,0],[0,2.76142]],[[763.04169,495],[2.76142,0],[0,0]]],"closed":true,"fillColor":[0,0,0],"strokeColor":[1,1,1],"strokeWidth":2}],["Path",{"name":"topoPath","applyMatrix":true,"segments":[[752.66669,478],[[765.66669,400],[-4.23478,23.34053],[8.66522,-47.75947]],[[795.66669,241],[-9.39576,47.6194],[3.80424,-19.2806]],[809.66669,177]],"strokeColor":[0,0,0],"strokeWidth":2,"strokeJoin":"round"}],["PointText",{"name":"topoNumber","applyMatrix":false,"matrix":[1,0,0,1,742.29169,484],"content":"11","fillColor":[1,1,1],"fontSize":20,"leading":24}]]}]]}]'

interface PageSlugType {
  slug: string []
}
export interface PageWithCatchAllUuidProps {
  params: PageSlugType
}

/**
 * Area/crag page
 */
export default async function Page ({ params }: PageWithCatchAllUuidProps): Promise<any> {
  const areaUuid = parseUuidAsFirstParam({ params })
  const pageData = await getArea(areaUuid)
  if (pageData == null) {
    notFound()
  }

  const userProvidedSlug = getFriendlySlug(params.slug?.[1] ?? '')

  const img = testImage

  const { area } = pageData

  const photoList = area?.media ?? []
  const { uuid, pathTokens, ancestors, areaName, content, authorMetadata, metadata, organizations } = area
  const { description } = content
  const { lat, lng } = metadata

  const correctSlug = getFriendlySlug(areaName)

  if (correctSlug !== userProvidedSlug) {
    permanentRedirect(getAreaPageFriendlyUrl(uuid, areaName))
  }

  return (
    <AreaPageContainer
      photoGallery={
        photoList.length === 0
          ? <UploadPhotoCTA />
          : <PhotoMontage photoList={photoList} />
      }
      pageActions={<AreaPageActions areaName={areaName} uuid={uuid} />}
      breadcrumbs={
        <StickyHeaderContainer>
          <AreaCrumbs pathTokens={pathTokens} ancestors={ancestors} />
        </StickyHeaderContainer>
      }
      map={
        <LazyAreaMap
          focused={null}
          selected={area.id}
          subAreas={area.children}
          area={area}
        />
      }
    >
      <div className='area-climb-page-summary'>
        <div className='area-climb-page-summary-left'>
          <h1>{areaName}</h1>

          <div className='mt-6 flex flex-col text-xs text-secondary border-t border-b divide-y'>
            <a
              href={getMapHref({
                lat,
                lng
              })}
              target='blank'
              className='flex items-center gap-2 py-3'
            >
              <MapPinLine size={20} />
              <span className='mt-0.5'>
                <b>LAT,LNG</b>&nbsp;
                <span className='link-dotted'>
                  {lat.toFixed(5)}, {lng.toFixed(5)}
                </span>
              </span>
            </a>
            <ArticleLastUpdate {...authorMetadata} />
          </div>
        </div>

        <div className='area-climb-page-summary-right'>
          <div className='flex items-center gap-2'>
            <h3 className='font-bold'>Description</h3>
            <span className='text-xs inline-block align-baseline'>
              [
              <Link
                href={`/editArea/${uuid}/general#description`}
                target='_new'
                className='hover:underline'
              >
                Edit
              </Link>]
            </span>
          </div>
          {(description == null || description.trim() === '') && <EditDescriptionCTA uuid={uuid} />}
          <Markdown className='wiki-content'>{description}</Markdown>

          <hr className='border-1 mt-8 mb-4' />

          <LCOBanner orgs={organizations} />
        </div>
      </div>

      <hr className='border-1 my-8' />

      {/* An area can only have either subareas or climbs, but not both. */}
      <div className='mt-8'>
        <SubAreasSection area={area} />
        {metadata.leaf && <Topo activeRoute={undefined} image={img} data={testdata} isEditor={false}/>}
        <ClimbListSection area={area} />
      </div>
    </AreaPageContainer>
  )
}

/**
 * Extract and validate uuid as the first param in a catch-all route
 */
const parseUuidAsFirstParam = ({ params }: PageWithCatchAllUuidProps): string => {
  if (params.slug.length === 0) {
    notFound()
  }

  const uuid = params.slug[0]
  if (!validate(uuid)) {
    console.error('Invalid uuid', uuid)
    notFound()
  }
  return uuid
}

const EditDescriptionCTA: React.FC<{ uuid: string }> = ({ uuid }) => (
  <div role='alert' className='alert'>
    <Lightbulb size={24} />
    <div className='text-sm'>No information available.  Be the first to&nbsp;
      <Link href={`/editArea/${uuid}/general#description`} target='_new' className='link-dotted inline-flex items-center gap-1'>
        add a description <ArrowRight size={16} />
      </Link>
    </div>
  </div>
)

/**
 * List of area pages to prebuild
 */
export function generateStaticParams (): PageSlugType[] {
  const list = [
    { slug: ['bea6bf11-de53-5046-a5b4-b89217b7e9bc'] }, // Red Rock
    { slug: ['78da26bc-cd94-5ac8-8e1c-815f7f30a28b'] }, // Red River Gorge
    { slug: ['1db1e8ba-a40e-587c-88a4-64f5ea814b8e'] }, // USA
    { slug: ['ab48aed5-2e8d-54bb-b099-6140fe1f098f'] }, // Colorado
    { slug: ['decc1251-4a67-52b9-b23f-3243e10e93d0'] }, // Boulder
    { slug: ['f166e672-4a52-56d3-94f1-14c876feb670'] }, // Indian Creek
    { slug: ['5f0ed4d8-ebb0-5e78-ae15-ba7f1b3b5c51'] }, // Wasatch range
    { slug: ['b1166235-3328-5537-b5ed-92f406ea8495'] }, // Lander
    { slug: ['9abad566-2113-587e-95a5-b3abcfaa28ac'] } // Ten Sleep
  ]
  if (process.env.VERCEL_ENV !== 'production') {
    return list.slice(0, 1)
  }
  return list
}

// Page metadata
export async function generateMetadata ({ params }: PageWithCatchAllUuidProps): Promise<Metadata> {
  const areaUuid = parseUuidAsFirstParam({ params })

  const { area: { uuid, areaName, pathTokens, media } } = await getArea(areaUuid, 'cache-first')

  let wall = ''
  if (pathTokens.length >= 2) {
    // Get the ancestor area's name
    wall = sanitizeName(pathTokens[pathTokens.length - 2]) + ' • '
  }

  const name = sanitizeName(areaName)

  const previewImage = media.length > 0 ? `${CLIENT_CONFIG.CDN_BASE_URL}/${media[0].mediaUrl}?w=1200q=75` : null

  const description = `Community knowledge • ${wall}${name}`

  return {
    title: `${name} climbing area`,
    alternates: {
      canonical: `https://openbeta.io/area/${uuid}/${getFriendlySlug(areaName)}`
    },
    description,
    openGraph: {
      description,
      ...previewImage != null && { images: previewImage }
    }
  }
}
