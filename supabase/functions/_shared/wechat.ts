import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

export async function getPrivateKey(supabaseClient: any) {
  const { data, error } = await supabaseClient
    .from('system_settings')
    .select('value')
    .eq('key', 'wechat_pay_private_key')
    .single()

  if (error) throw error
  return data?.value
}
