import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

// Auth.js(NextAuth) v5 설정 — Credentials Provider로 DB의 이메일/비밀번호를 직접 검증하고,
// 세션은 서명된 JWT 쿠키로 관리합니다.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === "string" ? credentials.email : undefined;
        const password = typeof credentials?.password === "string" ? credentials.password : undefined;
        if (!email || !password) return null;

        await connectDB();
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return null;

        // bcrypt.compare: 입력값을 다시 해싱해 저장된 해시와 비교합니다.
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return null;

        // 세션에 담기는 값 — passwordHash는 절대 포함하지 않습니다.
        return { id: String(user._id), name: user.name, email: user.email };
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
});
