<lov-code>
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// 解密回调数据
async function decryptResource(ciphertext: string, associatedData: string, nonce: string, apiV3Key: string) {
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(apiV3Key),
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: new TextEncoder().encode(nonce),
        additionalData: new TextEncoder().encode(associatedData),
      },
      key,
      new TextEncoder().encode(ciphertext)
    );

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error('解密回调数据失败:', error);
