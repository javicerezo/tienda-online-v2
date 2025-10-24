import { adminAuth } from "../../lib/firebase/firebase.admin";

import type { HandlerEvent } from "@netlify/functions";

export const verifyTokenAuthentication = async (event: HandlerEvent) => {
    const authHeader =
        event.headers?.authorization ||
        event.headers?.Authorization ||
        event.headers?.["client-authorization"] ||
        event.headers?.["Client-Authorization"] ||
        "";

  if (!authHeader.startsWith("Bearer ")) {
    console.warn("Auth header ausente o sin 'Bearer '", { headers: event.headers });
    return { isAuthenticated: false, uid: null };
  }

    const idToken = authHeader.slice("Bearer ".length).trim();
    console.log(idToken)
    try {
        const decoded = await adminAuth.verifyIdToken(idToken);
        return { isAuthenticated: true, uid: decoded.uid }
    } catch (e){
        // token inválido → seguimos como invitado
        console.error('verifyIdToken error:', e);
        return { isAuthenticated: false, uid: null }
    }
}