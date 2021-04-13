const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        return res.render("profile", { profile: await Profile.get() }) //pegando os dados do profile
    },
    async update(req, res) {
        //req.body para pegar os dados
        const data = req.body
        //definir quantas semanas tem no ano
        const weeksPerYear = 52
        //remover semanas de férias
        const weeksPerMonth =  (weeksPerYear - data["vacation-per-year"] ) / 12
        //horas trabalhadas na semana
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        //horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth
        // dedfinir o valor da minha hora
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        const profile = await Profile.get()

        await Profile.update({
            ... profile,
            ...req.body,
            "value-hour": valueHour,
        })
        return res.redirect('/profile')
    }
}